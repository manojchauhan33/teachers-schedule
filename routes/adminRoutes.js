import express from 'express';
import { renderAdminDashboard } from '../controllers/adminController.js';
import roleCheck from '../middlewares/roleCheck.js';

const router = express.Router();

router.get('/', roleCheck('admin'), renderAdminDashboard);

export default router;
