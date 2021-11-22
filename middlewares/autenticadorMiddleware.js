function autenticadorMiddleware(req, res, netx) {
    if (!req.session.userLogged) {
        return res.redirect('user/login'); 
    }
    netx(); 
}

module.exports = autenticadorMiddleware; 

