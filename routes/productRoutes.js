const express=require('express');
const router =express.Router();
const multer=require('multer');
const path=require('path');
const productController=require('../controllers/productController');
const validationEditProd=require('../middlewares/validationEditProdMiddleware');
const validationCreateProd= require ('../middlewares/validationCreateProductMiddleware')

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


router.get('/',productController.index);


/*3*/ /*router.get('/:id', productController.detalleProduct); 


/*7*/ /*router.delete('/:id', productController.destroy); */

//CRUD 

/*1 -- LECTURA*/ router.get('/listProduct',productController.list)

router.get('/nuevosProd',productController.nuevosProd);

router.get('/:id/edicionProdDb', productController.editProductDb);

/* -- ACTUALIZAR*/ router.put('/:id/edicionProdDb',validationEditProd, productController.modificarProdDb);

router.get('/:id/deleteProd', productController.delete);

router.delete('/:id/deleteProd', productController.destroy);


router.post('/nuevosProd', validationCreateProd, productController.createNewProd);




module.exports=router;
