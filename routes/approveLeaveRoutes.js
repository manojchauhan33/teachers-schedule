import express from 'express';
import roleCheck from '../middlewares/roleCheck.js';
import { renderApprovePage, approveLeave, rejectLeave } from '../controllers/approveController.js';
import { sendAdjustment} from '../controllers/adjustmentController.js';

const router = express.Router();



router.get('/', roleCheck('admin'), renderApprovePage);
router.post('/approve/:id', roleCheck('admin'), approveLeave);
router.post('/reject/:id', roleCheck('admin'), rejectLeave);



router.post('/send', roleCheck('admin'), sendAdjustment);


export default router;

