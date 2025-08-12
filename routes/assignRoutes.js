import express from 'express';
import roleCheck from '../middlewares/roleCheck.js';
import {renderAssignTimetable,saveTimetable,deleteLecture} from '../controllers/assignController.js';



const router = express.Router();


router.get('/', roleCheck('admin'), renderAssignTimetable);
router.post('/', roleCheck('admin'), saveTimetable);
router.post('/delete', roleCheck('admin'), deleteLecture);

export default router;

