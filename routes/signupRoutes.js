const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multerConfig');
const signupController = require('../controllers/signupController');



router.get('/', (req, res) => {
  res.render('signup');
});


router.post('/', upload.single('profilePic'), signupController.signup);

module.exports = router;
