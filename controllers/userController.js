const bcryptjs = require("bcryptjs");

const { validationResult } = require("express-validator");

const Users = require("../database/models/Usuario");
/*const JsonModel=require('../models/jsonModel');
const userModel=new JsonModel('users');*/
const { Usuario } = require("../database/models");
const db = require("../database/models");
const sequelize = db.sequelize;
/*const Users = require('../models/Usuario');*/
const { Op } = require("sequelize");
const { response } = require("express");

const userController = {
  list: function (req, res) {
    db.Users.findAll().then(function (users) {
      res.render("list", {
        users: users,
      });
    });
  },
  edit: function (req, res) {
    db.Users.findByPk(req.params.id)
      .then((users) =>
        res.render("edit", {
          users,
        })
      )
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
      db.Users.update(
        {
          email: req.body.email,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      )
        .then(() => res.redirect("/user/list"))
        .catch((errors) => console.log(console.log(errors)));
    }
  },

  delete: function (req, res) {
    db.Users.findByPk(req.params.id)
      .then((users) =>
        res.render("delete", {
          //c:
          users,
        })
      )
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
        } else {
          const resultValidation = validationResult(req);
          if (resultValidation.errors.length > 0) {
            return res.render("register", {
              errors: resultValidation.mapped(),
              oldData: req.body,
            });
          }

          let UserPassword = req.body.user_password;
          let passwordEncry = bcryptjs.hashSync(UserPassword, 10);

          db.Users.create({
            email: req.body.user_email,
            password: passwordEncry,
            name: req.body.user_nombre,
            last_name: req.body.user_apellido,
            imageName: req.file.filename,
          })
            .then(function () {
              res.redirect("/register/login");
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  },

  login: (req, res) => {
    console.log("Llegue");
    return res.render("login");
  },

  loginProcess: (req, res) => {
    // let userInDB = User.findByField('email', req.body.email);
    // BUSCAR USUARIO EN BDD
    let userInDB;
    db.Users.findAll({
      where: { email: req.body.user_email },
    }).then((resultado) => {
      userInDB = resultado;

      if (userInDB.length == 0) {
        return res.render("login", {
          errors: {
            email: {
              msg: "Este email no está registrado",
            },
          },
          oldData: req.body,
        });
      } else {
        // Chequear password
        // console.log(userInDB[0].dataValues.password);
        if (
          !bcryptjs.compareSync(
            req.body.user_password,
            userInDB[0].dataValues.password
          )
        ) {
          return res.render("login", {
            errors: {
              password: {
                msg: "Credenciales invalidas",
              },
            },
            oldData: req.body,
          });
        } else {
          // Usuario OK para loguear
          delete userInDB.password;
          // req.session.user = userInDB;
          req.session.user = userInDB[0].dataValues;
          if (req.body.Login_RememberMe) {
            res.cookie("userEmail", req.body.email, { maxAge: 1000 * 60 * 60 });
          }

          return res.redirect("/register/userProfile");
        }
      }
    });
  },

  profile: (req, res) => {
    console.log("donde pasa esto", req.session.user);
    return res.render("userProfile", {
      user: req.session.user,
    }); //cree la vista
  },

  logout: (req, res) => {
    req.session.destroy(); //borra lo que esta en session
    res.clearCookie("user_email");
    return res.redirect("/");
  },
};

module.exports = userController;
