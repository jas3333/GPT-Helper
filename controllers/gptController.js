import Messages from './../models/messages.js';
import personas from './../data/personas.js';
import { getEmbeddings, callGPT } from './../utils/tools.js';
import { queryIndex, upsert } from './../utils/pinecone.js';
import { v4 as uuidv4 } from 'uuid';

const sendQuestion = async (req, res) => {
    let vector = await getEmbeddings(req.body.promptQuestion);
    let uniqueID = uuidv4();

    let metaData = {
        _id: uniqueID,
        speaker: 'USER',
        message: req.body.promptQuestion,
    };

    let createMessage = await Messages.create(metaData);

    const payload = [{ uniqueID, vector }];

    const pineconeResults = await queryIndex(vector);

    const ids = pineconeResults.matches.map((match) => match.id);
    const mongoQuery = await Messages.find({ _id: { $in: ids } });

    console.log(mongoQuery);

    const prompt = `${mongoQuery}\nUser:${req.body.promptQuestion}`;

    const output = await callGPT(
        prompt,
        Number(req.body.temperature),
        Number(req.body.top_p),
        Number(req.body.tokens),
        Number(req.body.presencePenalty),
        Number(req.body.frequencyPenalty),
        personas[req.body.persona].prompt
    );

    vector = await getEmbeddings(output);
    uniqueID = uuidv4();
    metaData = {
        _id: uniqueID,
        speaker: personas[req.body.persona].name,
        message: output,
    };
    createMessage = await Messages.create(metaData);

    payload.push({ uniqueID, vector });

    const uploadVector = await upsert(payload);

    res.status(200).json({ message: output, profilePic: personas[req.body.persona].profilePic });
};

export { sendQuestion };
