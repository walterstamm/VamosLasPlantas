function autenticadorMiddleware(req, res, next) {
    if (!req.session.user) {
        return res.redirect('/register/login'); //no es /user?
    }
    next(); 
}

module.exports = autenticadorMiddleware; 

