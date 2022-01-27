const express=require('express');
const router =express.Router();

const usersController=require('../controllers/userController');

const validations = require ('../middlewares/validateRegisterMiddleware');
const uploadFile = require('../middlewares/multerMiddleware');
const invitadosMiddleware = require('../middlewares/invitadosMiddleware');
const autenticadorMiddleware = require('../middlewares/autenticadorMiddleware');
const validationUpDate = require("../middlewares/validationUpDateMiddleware"); 
const validationLogin = require("../middlewares/validationLoginUser");
const adminMiddleware = require('../middlewares/adminMiddleware'); // validacion del admin

//Formulario de registro
/*router.get('/', usersController.register); //falta el invitadomiddleware*/

//Proceso del registro
//router.post('/', uploadFile.single('user_foto'),validations, usersController.processRegister);

//Form del login
router.get('/login', invitadosMiddleware, usersController.login);

//Proceso del formulario de login 
router.post('/login', validationLogin, usersController.loginProcess);

//Perfil del usuario
router.get('/profile/:userId', autenticadorMiddleware, usersController.profile)

router.get('/profile/:userId', autenticadorMiddleware, usersController.profile);


router.get('/userProfile',autenticadorMiddleware,usersController.profile )

//Logout
router.get('/logout', usersController.logout);



router.get('/list',adminMiddleware, usersController.list);


router.get('/register', usersController.create);

router.post('/register',uploadFile.single('user_foto'),validations ,usersController.createProcess);

router.get('/:id/delete',autenticadorMiddleware, usersController.delete);

router.delete('/:id/delete', usersController.destroy);

router.get('/:id/edit',autenticadorMiddleware,usersController.edit);

router.put('/:id/edit',validationUpDate, usersController.update)


module.exports = router;



