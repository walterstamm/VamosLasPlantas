const express=require('express');
const router =express.Router();
const multer=require('multer');
const path=require('path');
const controller=require('../controllers/productController');

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.resolve(__dirname,'../public/images/plantas'))
    },
    //desarrollando como va a ser el nombre de los archivos
    //intentando tomar el valor que trae del droPDOWNlIST
    filename:(req,file,cb)=>{
        const newFilename='product'+Date.now()+path.extname(file.originalname);
        cb(null,newFilename);

    }
});

const upload=multer({storage});


router.get('/',controller.index);

router.get('/nuevosProd',controller.nuevosProd);

router.post('/nuevosProd',upload.single('image'),controller.guardarNuevo);

module.exports=router;