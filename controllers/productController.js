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
       
    
    req.body.imagen=req.file.filename;
    if(req.body.id==undefined)productsModel.save(req.body);
    else productsModel.update(req.body); 
    
    res.redirect('/product');
},
    detalleProduct: (req, res) => {
        let productoBuscado = productsModel.find(req.params.id);
        return res.render('product',{product: [productoBuscado]} ); 

    },
    editProduct: (req, res) => {
        let productoBuscado = productsModel.find(req.params.id);
        return res.render('editProduct', {product: productoBuscado}); 
    },
    destroy: (req, res) => {
        let id=req.params.id;
        productsModel.destroy(id); 
        //retorna una vista con todos los productos
        let product = productsModel.all();

        return res.render('product', {product})
    },
    modificarProd:(req,res)=>{
        req.body.id = req.params.id;
        req.body.imagen = req.file ? req.file.filename : req.body.oldImage;
        productsModel.update(req.body);
        res.redirect('/product/' + req.params.id);
    }
}


module.exports=controller;