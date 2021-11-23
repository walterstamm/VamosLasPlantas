function invitadosMiddleware(req, res, next) {
    if (req.session.userLogged) {
        return res.redirect('/user/profile/' + req.session.userLogged.id); ///user/profile?
    } 
    next(); 
}

module.exports = invitadosMiddleware; 

