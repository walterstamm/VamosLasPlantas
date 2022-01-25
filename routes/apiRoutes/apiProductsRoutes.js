const express=require('express');
const router =express.Router();
const apiProductsController = require("../../controllers/apiController/apiProductsController");


router.get('/', apiProductsController.lista); 

/*router.get('/:id', productController.show); 
router.post('/:', productController.almacen);*/

module.exports=router;
