import express from 'express';
import roleCheck from '../middlewares/roleCheck.js';
import {
  renderApprovePage,
  updateLeaveStatus,
  updateAdjustmentStatus,
  deleteLeave,
  deleteAdjustment
} from '../controllers/approveLeaveController.js';



const router = express.Router();

router.get('/', roleCheck('admin'), renderApprovePage);
router.post('/leave-status', roleCheck('admin'), updateLeaveStatus);
router.post('/adjustment-status', roleCheck('admin'), updateAdjustmentStatus);
router.post('/delete-leave', roleCheck('admin'), deleteLeave);
router.post('/delete-adjustment', roleCheck('admin'), deleteAdjustment);

export default router;
