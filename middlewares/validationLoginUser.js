const path = require('path');
const {body} = require('express-validator');

module.exports = [    
    
    body('user_email').notEmpty().withMessage('Ingresá tu correo electrónico').bail().isEmail().withMessage('Debes escribir un formato de correo válido'),
    body('user_password').notEmpty().withMessage('Tienes que escribir una contraseña')
]