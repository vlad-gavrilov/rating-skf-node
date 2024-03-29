module.exports = (req, res, next) => {
  res.locals.isAuth = req.session.isAuthenticated;
  res.locals.csrfToken = req.csrfToken();
  next();
};
