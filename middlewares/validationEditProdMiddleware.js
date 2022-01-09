const path = require('path');
const {body} = require ('express-validator');

module.exports = [
    body ('producto').notEmpty().isLength({min: 5}).withMessage('Ingrese el nombre del producto'),
    body ('descripcion').notEmpty().isLength({min: 20}).withMessage('Por favor, ingrese una descripcion'),
    body ('precio').notEmpty().withMessage('Debes ingresar un precio'),
]