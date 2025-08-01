import express from 'express';
import upload from '../middlewares/multerConfig.js';
import { signup } from '../controllers/signupController.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('signup');
});


router.post('/', upload.single('profilePic'), signup);

export default router;