const express=require('express');
const router =express.Router();
const path=require('path');
const productController=require('../controllers/productController');
const validationEditProd=require('../middlewares/validationEditProdMiddleware');
const validationCreateProd= require ('../middlewares/validationCreateProductMiddleware')
const uploadFile = require('../middlewares/multerProduct');
const autenticadorMiddleware = require('../middlewares/autenticadorMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const validationLogin = require("../middlewares/validationLoginUser");




router.get('/',validationLogin,productController.index);


/*3*/ /*router.get('/:id', productController.detalleProduct); 


/*7*/ /*router.delete('/:id', productController.destroy); */

//CRUD 

router.get('/listProduct',productController.list)

router.get('/nuevosProd',adminMiddleware,autenticadorMiddleware,productController.nuevosProd);

router.get('/:id/edicionProdDb',adminMiddleware,autenticadorMiddleware, productController.editProductDb);

/* -- ACTUALIZAR*/ router.put('/:id/edicionProdDb',validationEditProd, productController.modificarProdDb);

router.get('/:id/deleteProd',adminMiddleware,autenticadorMiddleware, productController.delete);


 router.delete('/:id/deleteProd', productController.destroy);


router.post('/nuevosProd',uploadFile.single('productFoto') , validationCreateProd, productController.createNewProd);



module.exports=router;
