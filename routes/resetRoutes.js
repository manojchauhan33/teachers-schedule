import express from 'express';
import { renderResetForm, updatePassword } from '../controllers/resetController.js';

const router = express.Router();


router.get('/reset-password', (req, res) => {
  res.status(400).send('Token is required.');
});

router.post('/reset-password', (req, res) => {
  res.status(400).send('Token is required.');
});


router.get('/reset-password/:token', renderResetForm);     //token is required here 



// http://localhost:3000/reset-password/ba2e26955fe35acf996f6a2cb024b76ba04ef4b8523cf79ae15b46ca42171759


router.post('/reset-password/:token', updatePassword);


export default router;
