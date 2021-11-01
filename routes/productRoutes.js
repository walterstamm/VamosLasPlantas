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
        const newFilename='./product'+Date.now()+path.extname(file.originalname);
        cb(null,newFilename);

    }
});

const upload=multer({storage});


/*1*/ router.get('/',controller.index);

/*2*/ router.get('/nuevosProd',controller.nuevosProd);

/*3*/ router.get('/:id', controller.detalleProduct);

/*4*/ router.post('/products',upload.single('imagen'),controller.guardarNuevo);

/*5*/ router.get('/product/:id/edit', controller.editProduct);

/*6 router.put('/products',upload.single('imagen'), controller.modifcarProd);*/

/*7*/ router.delete('/product/:id', controller.destroy);

module.exports=router;
