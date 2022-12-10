import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
app.use(express.json());
import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost:27017/GPTCoversations');

const PORT = process.env.PORT;

const conversationSchema = new mongoose.Schema({
    title: String,
    conversation: [
        {
            botResponse: String,
            promptQuestion: String,
            totalTokens: Number,
        },
    ],
});
const Conversation = mongoose.model('Conversation', conversationSchema);

app.post('/api', (req, res) => {
    Conversation.create(req.body, (error, conversation) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Conversation has been saved.');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});
