const path = require ('path');
const multer = require('multer');

const storage = multer.diskStorage ({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname,'../public/images/avatars'));
    
    },
    filename: (req, file, cb) => {
        let fileName = 'user-' + Date.now() + path.extname(file.originalname);
        cb(null, fileName);
    }
})

const uploadFile = multer ({storage});

module.exports = uploadFile;