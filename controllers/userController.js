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
        
    

        req.body.user_foto=req.file.filename;
        console.log(req.body);
        userModel.save(req.body);
        
        
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