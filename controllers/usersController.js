const JsonModel=require('../models/jsonModel');

//instancia el objeto model para poder usar los metodos de la clase 
const usersModel=new JsonModel('users');

const getFileName = (file, imagen) => {
    if (!file && !imagen) return '';
    
    console.log(file.filename, imagen);

    return file.filename.includes("./images/users") ? file.filename :  "./images/users" + file.filename.slice(1);
  };

const controller={
    index:(req,res)=>{
        let users = usersModel.all();

        return res.render('users', {users})
    },
    nuevosUsers:(req,res)=>{
        return res.render('nuevosUsers', {users: {} });
    },
    //el metodo file de req osea req.file esta disponible gracias a multer y la ////configuracion hecha en las routes

   guardarNuevo: (req,res)=>{ 
       
    
    req.body.imagen=req.file.filename;
    if(req.body.id==undefined)usersModel.save(req.body);
    else usersModel.update(req.body); 
    
    res.redirect('/users');
},
    detalleUsers: (req, res) => {
        let usersBuscado = usersModel.find(req.params.id);
        return res.render('users',{users: [usersBuscado]} ); 

    },
    editUsers: (req, res) => {
        let usersBuscado = usersModel.find(req.params.id);
        return res.render('editUsers', {users: usersBuscado}); 
    },
    destroy: (req, res) => {
        let id=req.params.id;
        usersModel.destroy(id); 
        //retorna una vista con todos los usuarios
        let users = usersModel.all();

        return res.render('users', {users})
    },
    modificarUsers:(req,res)=>{
        req.body.id = req.params.id;
        req.body.imagen = req.file ? req.file.filename : req.body.oldImage;
        usersModel.update(req.body);
        res.redirect('/users/' + req.params.id);
    }
}


module.exports=controller;