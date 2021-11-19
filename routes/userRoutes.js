const express=require('express');
const router =express.Router();
//const multer=require('multer');
//const path=require('path');
const usersController=require('../controllers/userController');

const uploadFile = require('../middlewares/multerMiddleware');
const validations = require ('../middlewares/validateRegisterMiddleware');

router.get('/', usersController.register);

router.post('/', uploadFile.single('user_foto'),validations, usersController.processRegister);

router.get('/login', usersController.login);

router.get('/profile/:userId', usersController.profile);

module.exports = router;



/*const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.resolve(__dirname,'../public/images/users'))
    },
    //desarrollando como va a ser el nombre de los archivos
    //intentando tomar el valor que trae del droPDOWNlIST
    filename:(req,file,cb)=>{
        const newFilename='./users'+Date.now()+path.extname(file.originalname);
        cb(null,newFilename);

    }
});

const upload=multer({storage});*/



//*1*/ router.get('/',controller.index);

//*2*/ router.get('/nuevosUsers',controller.nuevosUsers);

//*3*/ router.get('/:id', controller.detalleUsers);

//*4*/ router.post('/',upload.single('imagen'),controller.guardarNuevo);

//*5*/ router.get('/:id/edit', controller.editUsers);

//*6*/ router.put('/:id',upload.single('oldImagen'), controller.modificarUsers);

//*7*/ router.delete('/:id', controller.destroy);

//module.exports=router;