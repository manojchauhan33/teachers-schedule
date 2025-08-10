import express from 'express';
import roleCheck from '../middlewares/roleCheck.js';
import { renderInboxPage } from '../controllers/inboxController.js';

const router = express.Router();

router.get('/', roleCheck('user'), renderInboxPage);

export default router;
