const path = require('path');
const {body} = require ('express-validator');

module.exports = [
    body ('producto').notEmpty().withMessage('Ingresar el nombre del producto').isLength({min: 5}).withMessage('Ingresar 5 caracteres mínimo'),
    body ('descripcion').notEmpty().withMessage('Ingresar la descripcion').isLength({min: 20}).withMessage('Ingresar 20 caracteres minimo'),
    body ('precio').notEmpty().withMessage('Ingresar el precio')
]