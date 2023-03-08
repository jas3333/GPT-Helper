import express from 'express';
import { sendQuestion, reset, load } from '../controllers/gptController.js';

const router = express.Router();

router.route('/').post(sendQuestion);
router.route('/reset').post(reset);
router.route('/load').post(load);

export default router;
