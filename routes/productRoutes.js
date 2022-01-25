const express=require('express');
const router =express.Router();
const path=require('path');
const productController=require('../controllers/productController');
const validationEditProd=require('../middlewares/validationEditProdMiddleware');
const validationCreateProd= require ('../middlewares/validationCreateProductMiddleware')
const uploadFile = require('../middlewares/multerProduct');




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


router.post('/nuevosProd',uploadFile.single('productFoto') , validationCreateProd, productController.createNewProd);



module.exports=router;
