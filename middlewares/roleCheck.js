function roleCheck(expectedRole) {
  return function (req, res, next) {
    if (req.session.user && req.session.user.role === expectedRole) {
      next();
    } else {
      res.redirect('/login');
    }
  };
}

export default roleCheck;
