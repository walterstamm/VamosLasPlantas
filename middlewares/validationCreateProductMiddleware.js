const path = require('path');
const {body} = require ('express-validator');

module.exports = [
        body ('producto').notEmpty().withMessage('Ingresar el nombre del producto').isLength({min: 5}).withMessage('Ingresar 5 caracteres mínimo'),
        body ('descripcion').notEmpty().withMessage('Ingresar la descripcion').isLength({min: 20}).withMessage('Ingresar 20 caracteres minimo'),
        body ('precio').notEmpty().withMessage('Ingresar el precio'),
        body ('productFoto').custom((value, { req }) => {
                let file = req.file;
                let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
        
                if (!file) {
                    throw new Error('Tenes que subir una imagen');
                } else {
                    let fileExtension = path.extname(file.originalname);
                    if (!acceptedExtensions.includes(fileExtension)) {
                        throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(',')}`);
                    }
                }
                return true;
            })
]