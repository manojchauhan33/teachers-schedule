const express = require('express');
const router = express.Router();
const assignController = require('../controllers/assignController');

const roleCheck = require('../middlewares/roleCheck'); 



router.get('/', roleCheck('admin'), assignController.renderAssignTimetable);
router.post('/', roleCheck('admin'), assignController.saveTimetable);
router.post('/delete', roleCheck('admin'), assignController.deleteLecture);

module.exports = router;
