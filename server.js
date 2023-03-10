import express from 'express';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import connectDB from './utils/connectDB.js';

import { getEmbeddings, callGPT } from './utils/tools.js';

dotenv.config();

connectDB();

const __dirname = dirname(fileURLToPath(import.meta.url));

import gptRouter from './router/gptRouter.js';

const app = express();
app.use(express.json());
app.use(express.static(path.resolve(__dirname, './client/build')));
const PORT = process.env.PORT || 4005;

app.use('/api/v1/gpt', gptRouter);

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});
