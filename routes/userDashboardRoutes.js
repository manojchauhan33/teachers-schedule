import express from 'express';
import { renderDashboardPage } from '../controllers/userDashboardController.js';
import roleCheck from '../middlewares/roleCheck.js';

const router = express.Router();

router.get('/', roleCheck('user'), renderDashboardPage);
router.get('/dashboard', roleCheck('user'), renderDashboardPage);


export default router;