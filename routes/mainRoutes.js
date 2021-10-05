const express=require('express');
const router =express.Router();

const mainController=require('../controllers/mainController');


router.get('/',mainController.index);

router.get('/cart',mainController.cart);

router.get('/login',mainController.login);

router.get('/nuevosProd',mainController.nuevosProd);

router.get('/product',mainController.product);

router.get('/register',mainController.register);

module.exports=router;