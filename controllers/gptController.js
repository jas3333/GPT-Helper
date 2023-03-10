import Messages from './../models/messages.js';
import personas from './../data/personas.js';
import { getEmbeddings, callGPT } from './../utils/tools.js';
import { queryIndex, upsert } from './../utils/pinecone.js';
import { v4 as uuidv4 } from 'uuid';

const sendQuestion = async (req, res) => {
    let previousQuestion = '';
    let previousResponse = '';
    if (req.body.conversation.length > 1) {
        previousQuestion = req.body.conversation[req.body.conversation.length - 1].promptQuestion;
        previousResponse = req.body.conversation[req.body.conversation.length - 1].botResponse;
    }

    console.log(`User: ${previousQuestion} ${personas[req.body.persona].name}: ${previousResponse}`);
    let vector = await getEmbeddings(req.body.promptQuestion);

    let uniqueID = uuidv4();

    let metaData = {
        _id: uniqueID,
        speaker: 'USER',
        message: req.body.promptQuestion,
    };

    let createMessage = await Messages.create(metaData);
    console.log(createMessage);

    const payload = [{ uniqueID, vector }];

    const pineconeResults = await queryIndex(vector);

    const ids = pineconeResults.matches.map((match) => match.id);
    const mongoQuery = await Messages.find({ _id: { $in: ids } });

    console.log(`Querying MongoDB for matching IDs: ${mongoQuery}`);

    const prompt = `Previous conversation: ${mongoQuery}\nPrevious question from User: ${previousQuestion}\nPrevious response from ${
        personas[req.body.persona].name
    }: ${previousResponse}User:${req.body.promptQuestion}`;

    const { data, usage } = await callGPT(
        prompt,
        Number(req.body.temperature),
        Number(req.body.top_p),
        Number(req.body.tokens),
        Number(req.body.presencePenalty),
        Number(req.body.frequencyPenalty),
        personas[req.body.persona].prompt
    );

    vector = await getEmbeddings(data);
    uniqueID = uuidv4();
    metaData = {
        _id: uniqueID,
        speaker: personas[req.body.persona].name,
        message: data,
    };
    createMessage = await Messages.create(metaData);

    payload.push({ uniqueID, vector });

    const uploadVector = await upsert(payload);

    res.status(200).json({ message: data, profilePic: personas[req.body.persona].profilePic, usage: usage });
};

export { sendQuestion };
