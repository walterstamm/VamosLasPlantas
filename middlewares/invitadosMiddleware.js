function invitadosMiddleware(req, res, netx) {
    if (req.session.userLogged) {
        console.info('corre');
        return res.redirect('userProfile'); 
    }
    netx(); 
}

module.exports = invitadosMiddleware; 

