import axios from 'axios';
import personas from './../data/personas.js';

const sendQuestion = async (req, res) => {
    const options = {
        headers: { Authorization: `Bearer ${process.env.OPEN_AI_KEY}`, 'Content-Type': 'application/json' },
    };

    console.log(req.body.conversation);

    const conversation = req.body.conversation.map((item) => {
        return `${item.promptQuestion} ${item.botResponse}`;
    });

    console.log(conversation);

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
        console.log(response.data);
        console.log(`Usage: ${response.data.usage.total_tokens}`);

        res.status(200).json({
            message: response.data.choices[0].message.content,
            profilePic: personas[req.body.persona].profilePic,
            usage: response.data.usage.total_tokens,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: error.data,
        });
    }
};

export { sendQuestion };
