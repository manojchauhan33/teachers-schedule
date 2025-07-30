import express from 'express';
import { logoutUser } from '../controllers/userController.js';

const router = express.Router();
router.post('/', logoutUser);


export default router;
