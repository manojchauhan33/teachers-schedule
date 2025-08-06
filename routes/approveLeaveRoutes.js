// routes/adminRoutes.js

import express from 'express';
import roleCheck from '../middlewares/roleCheck.js';

import {
  renderApprovePage,
  approveLeave,
  rejectLeave
} from '../controllers/approveController.js';

import {
  getAdjustmentOptions,
  sendAdjustmentRequest,
  acceptAdjustment,
  rejectAdjustment
} from '../controllers/adjustmentController.js';

const router = express.Router();






router.get('/', roleCheck('admin'), renderApprovePage);



router.post('/approve/:id', roleCheck('admin'), approveLeave);



router.post('/reject/:id', roleCheck('admin'), rejectLeave);





router.get('/adjustment/options/:leaveId', roleCheck('admin'), getAdjustmentOptions);


router.post('/adjustment/send', roleCheck('admin'), sendAdjustmentRequest);


router.post('/adjustment/accept/:requestId', roleCheck('admin'), acceptAdjustment);


router.post('/adjustment/reject/:requestId', roleCheck('admin'), rejectAdjustment);

export default router;
