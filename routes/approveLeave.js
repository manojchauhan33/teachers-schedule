const express = require('express');
const router = express.Router();
const approveLeaveController = require('../controllers/approveLeaveController');
const roleCheck = require('../middlewares/roleCheck'); 


router.get('/', roleCheck('admin'), approveLeaveController.renderApprovePage);

router.post('/leave-status', roleCheck('admin'), approveLeaveController.updateLeaveStatus);


router.post('/adjustment-status', roleCheck('admin'), approveLeaveController.updateAdjustmentStatus);

router.post('/delete-leave', roleCheck('admin'), approveLeaveController.deleteLeave);


router.post('/delete-adjustment', roleCheck('admin'), approveLeaveController.deleteAdjustment);

module.exports = router;
