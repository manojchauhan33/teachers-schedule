import express from 'express';
import roleCheck from '../middlewares/roleCheck.js';
import { renderAdminDashboard } from '../controllers/adminController.js';
const router = express.Router();



router.get('/', roleCheck('admin'), renderAdminDashboard);

export default router;

