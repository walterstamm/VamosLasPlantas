const User = require('../models/User'); 

function usuarioLogueadoMiddleware (req, res, next) {
    res.locals.isLogged = false; 

    let emailInCookie = req.cookies.user_email;
    let userFromCookie = User.findByField('email', emailInCookie);

    if(userFromCookie) {
        req.session.userLogged = userFromCookie; 
    }

    if(req.session && req.session.userLogged) {
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged
    }

    next(); 
}

module.exports = usuarioLogueadoMiddleware; 

