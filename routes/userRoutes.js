import express from 'express';
import roleCheck from '../middlewares/roleCheck.js';
import {renderUserDashboard,updateLectureStatus} from '../controllers/userController.js';




const router = express.Router();

router.get('/', roleCheck('user'), renderUserDashboard);
router.post('/update-status', roleCheck('user'), updateLectureStatus);



export default router;
