import express from 'express';
import { sendQuestion } from '../controllers/gptController.js';

const router = express.Router();

router.route('/').post(sendQuestion);

export default router;
