import express from 'express';
import { renderForgotPassword, sendResetLink } from '../controllers/forgotController.js';

const router = express.Router();

router.get('/', renderForgotPassword);
router.post('/', sendResetLink);

export default router;



