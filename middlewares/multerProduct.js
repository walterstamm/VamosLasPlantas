const path = require ('path');
const multer = require('multer');

const storage = multer.diskStorage ({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname,'../public/images/plantas'));
    
    },
    filename: (req, file, cb) => {
        let fileName = 'prod-' + Date.now() + path.extname(file.originalname);
        cb(null, fileName);
    }
})

const uploadFile = multer ({storage});

module.exports = uploadFile;