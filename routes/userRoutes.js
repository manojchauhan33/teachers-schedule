import express from 'express';
import {
  renderUserDashboard,
  updateLectureStatus
} from '../controllers/userController.js';
import roleCheck from '../middlewares/roleCheck.js';

const router = express.Router();

router.get('/', roleCheck('user'), renderUserDashboard);
router.post('/update-status', roleCheck('user'), updateLectureStatus);

export default router;
