import express from 'express';
import { renderLeaveForm, submitLeave } from '../controllers/leaveController.js';

const router = express.Router();

router.get('/', renderLeaveForm);
router.post('/apply-leave', submitLeave);

export default router;
