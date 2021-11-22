function invitadosMiddleware(req, res, next) {
    if (req.session.userLogged) {
        console.info('corre');
        return res.redirect('/user/profile'); ///user/profile?
    } 
    next(); 
}

module.exports = invitadosMiddleware; 

