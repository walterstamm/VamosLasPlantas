const bcryptjs = require('bcryptjs');

const { validationResult} = require('express-validator');

const Users = require ('../database/models/Usuario');
/*const JsonModel=require('../models/jsonModel');
const userModel=new JsonModel('users');*/
const {Usuario} = require ("../database/models");
const db = require("../database/models");
const sequelize = db.sequelize;
/*const Users = require('../models/Usuario');*/
const {Op} = require('sequelize'); 
const { response } = require('express');

const userController = {
    list: function (req, res) {
      db.Users.findAll()
      .then(function (users) {
          res.render("list", {
            users: users,
          });
        });
      },
      edit: function (req, res) {
        db.Users.findByPk(req.params.id)
          .then((users) => res.render("edit", {
            users
          }))
          .catch((err) => console.log(err));
      },

      update: function (req, res) {
        const validation = validationResult(req);
        if (validation.errors.length > 0) {
          res.render("edit", {
            errors: validation.mapped(),
            oldData: req.body,
            users: {
              id: req.params.id,
            },
          });
        } else {
          db.Users.update({
              email: req.body.email,
            }, {
              where: {
                id: req.params.id,
              },
            })
            .then(() => res.redirect("/user/list"))
            .catch((errors) => console.log(console.log(errors)));}
      },

      delete: function (req, res) {
        db.Users.findByPk(req.params.id)
          .then((users) => res.render("delete", { //c:
            users
          }))
          .catch((err) => console.log(err));
      },

      destroy: function (req, res) {
        db.Users.destroy({
            where: {
              id: req.params.id,
            },
          })
          .then(() => res.redirect("/user/list"))
          .catch((err) => console.log(err));
      },

      create: function (req, res) {
          res.render("register");
      },
      createProcess: function (req, res) {
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
          return res.render("register", {
            errors: resultValidation.mapped(),
            oldData: req.body,
          });
        }
        let userInDB = db.Users.findOne({
            where: {
                email: req.body.user_email,
            },
          })
          .then((user) => {
            if (user) {
              res.render("register", {
                errors: {
                user_email: {
                    msg: "Este Email ya se encuentra registrado",
                  },
                },
              });
            }
          })
          .catch((err) => console.log(err));
    
        let UserPassword = req.body.user_password;
        let passwordEncry = bcryptjs.hashSync(UserPassword, 10);

        db.Users.create({
            email: req.body.user_email,
            password: passwordEncry,
            name: req.body.user_nombre,
            last_name: req.body.user_apellido
          })
          .then(function () {
            res.redirect("/user/login");
          })
          .catch((err) => console.log(err));
      },

    login: (req, res) => {
        console.log('Llegue')
        return res.render('login');    
    },
//anda bien
//loginProcess: function (req, res) {
  //let userToLogin = db.Users.findByField(('user_email', req.body.user_email),{
    //  where: {
      //  user_email: req.body.user_email,
     // },
    //})
    loginProcess: (req, res) => {
        /*let userToLogin = db.Users.findByField('user_email', req.body.user_email); agus*/
          let userToLogin = db.Users.findOne({
            where: {
                email: req.body.user_email
            }
        })
        .then (response => {userToLogin = response; 
        //.catch (error => res.send(error))
        //res.send (userToLogin)


       if(userToLogin) { 
            let okPassword = bcryptjs.compareSync(req.body.user_password, userToLogin.user_password)
           

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
    })},

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

module.exports = userController;