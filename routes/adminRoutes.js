const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

const roleCheck = require('../middlewares/roleCheck'); 

router.get('/', roleCheck('admin'), adminController.renderAdminDashboard);

module.exports = router;
