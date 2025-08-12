import express from 'express';
import roleCheck from '../middlewares/roleCheck.js';
import { renderInboxPage,acceptAdjustment,rejectAdjustment} from '../controllers/inboxController.js';

const router = express.Router();

router.get('/', roleCheck('user'), renderInboxPage);

router.post('/accept/:id', roleCheck('user'), acceptAdjustment);
router.post('/reject/:id', roleCheck('user'), rejectAdjustment);

export default router;


