const JsonModel=require('../models/jsonModel');

//instancia el objeto model para poder usar los metodos de la clase 
const productsModel=new JsonModel('productos');

const controller={
    index:(req,res)=>{
        return res.render('product')
    },
    nuevosProd:(req,res)=>{
        return res.render('nuevosProd');
    },
    //el metodo file de req osea req.file esta disponible gracias a multer y la ////configuracion hecha en las routes
    guardarNuevo:(req,res)=>{
        req.body.image=req.file?req.file.filename:'';
        let productId=productsModel.save(req.body);

        res.redirect('/product');//faltaria redireccionar con el ID del nuevo producto cargado
    }
}

module.exports=controller;