import open from 'open';
import express from 'express';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));

import gptRouter from './router/gptRouter.js';

const app = express();
app.use(express.json());
app.use(express.static(path.resolve(__dirname, './client/build')));
const PORT = process.env.PORT || 4001;

app.use('/api/v1/gpt', gptRouter);

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
    open(`http://localhost:${PORT}`);
});
