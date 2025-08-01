import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.render('approveLeave', {
    user: req.session.user || {}  // send an empty object if not logged in
  });
});

export default router;
