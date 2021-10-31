const JsonModel=require('../models/jsonModel');

//instancia el objeto model para poder usar los metodos de la clase 
const productsModel=new JsonModel('productos');

const controller={
    index:(req,res)=>{
        let product = productsModel.all();

        return res.render('product', {product})
    },
    nuevosProd:(req,res)=>{
        return res.render('nuevosProd');
    },
    //el metodo file de req osea req.file esta disponible gracias a multer y la ////configuracion hecha en las routes
    guardarNuevo:(req,res)=>{
        req.body.imagen=req.file?req.file.filename:'';
        let productId=productsModel.save(req.body);

        res.redirect('/product');//faltaria redireccionar con el ID del nuevo producto cargado
    },
    detalleProduct: (req, res) => {
        let productoBuscado = productsModel.find(req.query.id);
        return res.render('product',{product: productoBuscado} ); 
    },
    
}


module.exports=controller;