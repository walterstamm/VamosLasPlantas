function autenticadorMiddleware(req, res, netx) {
    if (!req.session.userLogged) {
        return res.redirect('/user/login'); //no es /user?
    }
    netx(); 
}

module.exports = autenticadorMiddleware; 

