const path = require('path');
const {body} = require ('express-validator');

module.exports = [
    body ('user_nombre').notEmpty().withMessage('Ingresá tu nombre')
            .isLength({ min: 2 }).withMessage('Ingresá mínimo 2 carácteres'),
    body ('user_apellido').notEmpty().withMessage('Ingresá tu apellido')
            .isLength({min: 2}).withMessage('Ingresá mínimo 2 carácteres'),
    body ('user_email').notEmpty().withMessage('Ingresá tu correo electrónico').bail()
            .isEmail().withMessage('Debes escribir un formato de correo válido'),
    body ('user_password').notEmpty().withMessage('Tienes que escribir una contraseña').isLength({min: 8})
            .withMessage('La contraseña debe tener mínimo 8 carácteres')
]
