const path = require('path');
const {body} = require ('express-validator');

module.exports = [
    body ('email').notEmpty().withMessage('Ingresá tu correo electrónico').bail().isEmail().withMessage('Debes escribir un formato de correo válido')
]