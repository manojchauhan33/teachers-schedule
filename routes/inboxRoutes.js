import express from 'express';
import roleCheck from '../middlewares/roleCheck.js'; 

const router = express.Router();

router.get('/', roleCheck('user'), (req, res) => {
  res.render('inbox', {
    user: req.session.user 
  });
});

export default router;
