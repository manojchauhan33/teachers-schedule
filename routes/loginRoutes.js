import express from 'express';
import loginController from '../controllers/loginController.js';

const router = express.Router();


router.get('/', (req, res) => {
  res.render('login');
});


router.post('/', loginController);

export default router;


