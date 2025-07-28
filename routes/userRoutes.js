const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const roleCheck = require('../middlewares/roleCheck'); 


router.get('/', roleCheck('user'), userController.renderUserDashboard);


router.post('/update-status', roleCheck('user'), userController.updateLectureStatus);

module.exports = router;
