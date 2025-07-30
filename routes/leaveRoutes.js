import express from 'express';
import roleCheck from '../middlewares/roleCheck.js';
import {
  renderLeaveForm,
  submitLeaveForm
} from '../controllers/leaveController.js';


const router = express.Router();

router.get('/', roleCheck('user'), renderLeaveForm);
router.post('/', roleCheck('user'), submitLeaveForm);

export default router;
