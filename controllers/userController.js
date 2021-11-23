const bcryptjs = require('bcryptjs');

const { validationResult} = require('express-validator');

const User = require ('../models/User');
const JsonModel=require('../models/jsonModel');
const userModel=new JsonModel('users');

const controller = {
    register: (req, res) => {
        return res.render('register');
    },

    processRegister: (req, res) => {
        const resultValidation = validationResult (req);

        
        if (resultValidation.errors.length > 0) {
            return res.render('register', {
                //mapped covierte de un array en objetos
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }
       
        
    let userEnDB= User.findByField('user_email', req.body.user_email); 


    if (userEnDB) {
        return res.render('register', {
            errors: {
                user_email: {
                    msg: 'Email ya registrado'
                }
            },
            oldData: req.body
        });
    } 
    
    delete req.body.confirm_password
        let userACrear = {
            ...req.body,
            user_password: bcryptjs.hashSync(req.body.user_password, 10),
            user_foto: req.file.filename, 
        }

        //req.body.user_foto=req.file.filename;
        //console.log(req.body);
        //userModel.save(req.body);
        

        let userCreado = User.create(userACrear);

        return res.redirect ('/user/login');
    }, 
    

    login: (req, res) => {
        console.log('Llegue')
        return res.render('login');    
    },
//anda bien

    loginProcess: (req, res) => {
        let userToLogin = User.findByField('user_email', req.body.user_email); 
       
        if(userToLogin) { 
            let okPassword = bcryptjs.compareSync(req.body.user_password, userToLogin.user_password); 
           

            if(okPassword) {
                delete userToLogin.user_password; //por seguridad borramos la pass
                req.session.userLogged = userToLogin; 
                //return res.redirect('/profile/:userId');
    console.log(req.session, 'Texto', userToLogin, 'tipo', typeof userToLogin); 

                if(req.body.remember_user) {
					res.cookie('user_email', req.body.user_email, { maxAge: (1000 * 60) * 60 })
				}

				return res.redirect('/user/profile/' + req.session.userLogged.id);

            }
            return res.render('login', {
                errors: {
                    user_email: {
                        msg: 'La contraseña es incorrecta'
                    }
                }
            });
        }

        return res.render('login', {
            errors: {
                user_email: {
                    msg: 'No se encuentra el usuario en la base de datos'
                }
            }
        });
    },

    profile: (req, res) => { 
        console.log('donde pasa esto', req.session.userLogged); 
        return res.render('userProfile', {
            user: req.session.userLogged, 
        }); //cree la vista
    },

    logout: (req, res) => { 
        req.session.destroy(); //borra lo que esta en session 
        res.clearCookie('user_email');
        return res.redirect('/'); 
    }
}

module.exports = controller;