module.exports = function (req, res, next) {
    if (!req.session.isAuthenticated && req.path !== '/login' && req.path !== '/register') {
        return res.redirect('/login');
    }
    next();
}