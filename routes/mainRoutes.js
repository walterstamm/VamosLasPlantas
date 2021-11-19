const express=require('express');
const router =express.Router();

const mainController=require('../controllers/mainController');
const productRoutes=require('./productRoutes');
const userRoutes=require('./userRoutes');


router.get('/',mainController.index);

router.use('/product',productRoutes);

router.use('/register', userRoutes);

router.get('/cart',mainController.cart);

router.get('/login',mainController.login);


module.exports=router;