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
    },
    detalleProduct: (req, res) => {
        let productoBuscado = productsModel.find(req.query.id);
        return res.render('product',{product: productoBuscado} ); 
    },
    
    
    
    
    editProducts: (req, res)=> {
        return res.render('update'); 
    }, 

    update(item) {
        let items = this.readJsonFile();

        let updatedItems = items.map(currentItem => {
            if (currentItem.id == item.id) {
                return currentItem = item;
            }
            return currentItem;
        });
        
        this.writeJsonFile(updatedItems);

        return item.id;
    }
}


module.exports=controller;