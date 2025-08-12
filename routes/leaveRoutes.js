import express from 'express';
import {
  renderLeaveForm,
  submitLeave,
  deleteLeaveRequest
} from '../controllers/leaveController.js';


const router = express.Router();

router.get('/', renderLeaveForm);
router.post('/apply-leave', submitLeave);
router.post('/delete/:id', deleteLeaveRequest);


export default router;


