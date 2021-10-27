const express=require('express');
const router =express.Router();

const mainController=require('../controllers/mainController');
const productRoutes=require('./productRoutes');



router.get('/',mainController.index);

router.use('/product',productRoutes);

router.get('/cart',mainController.cart);

router.get('/login',mainController.login);

router.get('/register',mainController.register);

module.exports=router;