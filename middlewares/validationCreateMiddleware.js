const path = require('path');
const {body} = require ('express-validator');

module.exports = [
    body ('user_nombre').notEmpty().isLength({min: 2}).withMessage('Ingresá tu nombre'),
    body ('user_apellido').notEmpty().isLength({min: 2}).withMessage('Ingresá tu apellido'),
    body ('user_email').notEmpty().withMessage('Ingresá tu correo electrónico').isEmail().withMessage('Debes escribir un formato de correo válido'),
    body ('user_password').notEmpty().isLength({min: 8}).withMessage('Tienes que escribir una contraseña de 8 carácteres mínimo')
]