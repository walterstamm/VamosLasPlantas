const { validationResult} = require('express-validator');

const User = require ('../models/User');

const controller = {
    register: (req, res) => {
        return res.render('register');
    },
    processRegister: (req, res) => {
        const resultValidation = validationResult (req);

        if (resultValidation.errors.length > 0) {
            return res.render('register', {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }

        let userToCreate = {
            ...req.body,
            avatar: req.file.filename
        }

        User.create (userToCreate);
        
        return res.send ('Se guardo el usuario');
    },

    login: (req, res) => {
        return res.render('login');    
    },

    profile: (req, res) => {
        return res.render('userProfile'); //falta crear vista
    },
}

module.exports = controller;