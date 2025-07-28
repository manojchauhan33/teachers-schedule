// routes/leaveRoutes.js
const express = require('express');
const router = express.Router();
const leaveController = require('../controllers/leaveController');
const roleCheck = require('../middlewares/roleCheck');

router.get('/', roleCheck('user'), leaveController.renderLeaveForm);
router.post('/', roleCheck('user'), leaveController.submitLeaveForm);

module.exports = router;
