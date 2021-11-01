const JsonModel=require('../models/jsonModel');

//instancia el objeto model para poder usar los metodos de la clase 
const productsModel=new JsonModel('productos');

const getFileName = (file, imagen) => {
    if (!file && !imagen) return '';
    console.log(file.filename, imagen);

    return file.filename.includes("./images/plantas") ? file.filename :  "./images/plantas" + file.filename.slice(1);
  };

const controller={
    index:(req,res)=>{
        let product = productsModel.all();

        return res.render('product', {product})
    },
    nuevosProd:(req,res)=>{
        return res.render('nuevosProd', {product: {} });
    },
    //el metodo file de req osea req.file esta disponible gracias a multer y la ////configuracion hecha en las routes

   guardarNuevo: (req,res)=>{ 
       console.log(req.file, req.body);
    req.body.imagen=getFileName(req.file, req.body.imagen);
    if(req.body.id)productsModel.update(req.body);
    else productsModel.save(req.body); 

    res.redirect('/product');//faltaria redireccionar con el ID del nuevo producto cargado
},
    detalleProduct: (req, res) => {
        let productoBuscado = productsModel.find(req.params.id);
        return res.render('product',{product: [productoBuscado]} ); 

    },
    editProduct: (req, res) => {
        let productoBuscado = productsModel.find(req.params.id);
        return res.render('nuevosProd', {product: productoBuscado}); 
    },
    destroy: (req, res) => {
        productsModel.destroy(req.params.id); 
        res.send("Eliminado");
    }
}


module.exports=controller;