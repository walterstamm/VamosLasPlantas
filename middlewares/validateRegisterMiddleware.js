const path = require('path');
const {body} = require ('express-validator');

module.exports = [
    body ('user_nombre').notEmpty().withMessage('Ingresá tu nombre'),
    body ('user_apellido').notEmpty().withMessage('Ingresá tu apellido'),
    body ('user_email').notEmpty().withMessage('Ingresá tu correo electrónico').bail().isEmail().withMessage('Debes escribir un formato de correo válido'),
    body ('user_password').notEmpty().withMessage('Tienes que escribir una contraseña'),
    body ('user_foto').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg','.jpeg', '.png', 'gif'];

        if (!file) {
            throw new Error('Tenes que subir una imagen');
        } else {
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);

            }
        }
        return true;
    })

]