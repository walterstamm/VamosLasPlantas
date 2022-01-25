const express=require('express');
const router =express.Router();
const apiUserController = require("../../controllers/apiController/apiUserController");


router.get('/', apiUserController.lista); 

/*router.get('/:id', productController.show); 
router.post('/:', productController.almacen);*/

module.exports=router;
