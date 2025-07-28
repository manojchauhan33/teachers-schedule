const express = require('express');
const router = express.Router();
const userDashboardController = require('../controllers/userDashboardController');
const roleCheck = require('../middlewares/roleCheck');


router.get('/', roleCheck('user'), userDashboardController.renderDashboardPage);


router.get('/dashboard', roleCheck('user'), userDashboardController.renderDashboardPage);

module.exports = router;
