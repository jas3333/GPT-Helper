import axios from 'axios';
import personas from './../data/personas.js';
const conversation = [];

const sendQuestion = async (req, res) => {
    const options = {
        headers: { Authorization: `Bearer ${process.env.OPEN_AI_KEY}`, 'Content-Type': 'application/json' },
    };

    console.log(req.body);

    const promptData = {
        model: 'gpt-3.5-turbo',
        messages: [
            { role: 'system', content: personas[req.body.persona].prompt },
            { role: 'user', content: `${conversation}\nUser: ${req.body.promptQuestion}\n` },
        ],
        n: 1,
        top_p: 1,
        temperature: Number(req.body.temperature),
        max_tokens: Number(req.body.tokens),
        presence_penalty: Number(req.body.presencePenalty),
        frequency_penalty: Number(req.body.frequencyPenalty),
    };

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', promptData, options);
        conversation.push([req.body.promptQuestion, response.data.choices[0].message.content]);
        console.log(conversation);

        // Controls the size of the array that stores the bots memory.
        if (conversation.length > 10) {
            conversation.shift();
        }

        console.log(response.data);

        res.status(200).json({
            message: response.data.choices[0].message.content,
            profilePic: personas[req.body.persona].profilePic,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: error.data,
        });
    }
};

const reset = async (req, res) => {
    console.log('Resetting conversation');
    conversation.splice(0, conversation.length);
    res.status(200).json({ message: 'Conversation reset' });
};

const load = async (req, res) => {
    conversation.push(req.body);
};

export { sendQuestion, reset, load };
