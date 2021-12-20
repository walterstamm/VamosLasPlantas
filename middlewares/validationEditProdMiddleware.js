const path = require('path');
const {body} = require ('express-validator');

module.exports = [
    body ('producto').notEmpty().withMessage('Ingrese el nombre del producto'),
    body ('descripcion').notEmpty().withMessage('Por favor, ingrese una descripcion'),
    body ('precio').notEmpty().withMessage('Debes ingresar un precio'),
]