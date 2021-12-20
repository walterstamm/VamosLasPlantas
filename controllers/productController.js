const JsonModel = require('../models/jsonModel');
const { validationResult } = require('express-validator');

//instancia el objeto model para poder usar los metodos de la clase 
const productsModel = new JsonModel('productos');
const db = require("../database/models");
const sequelize = db.sequelize;
const {Op} = require('sequelize'); 



const getFileName = (file, imagen) => {
    if (!file && !imagen) return '';

    console.log(file.filename, imagen);

    return file.filename.includes("./images/plantas") ? file.filename : "./images/plantas" + file.filename.slice(1);
};

const controller = {
    list: function (req, res) {
        db.Products.findAll()
            .then(function (product) {
                res.render("listProduct", {
                    product: product,
                });
            });
    },
    editProductDb: function (req, res) {
        db.Products.findByPk(req.params.id)
            .then((product) => res.render("edicionProdDb", { product: product }))
            .catch((err) => console.log(err));
    },

    modificarProdDb: function (req, res) {
        const validation = validationResult(req);
        if (validation.errors.length > 0) {
            res.render("edicionProdDb", {
                errors: validation.mapped(),
                oldData: req.body,
                product: {
                    id: req.params.id,
                },
            });
        } else {
            db.Products.update({
                product: req.body.producto,
                description: req.body.descripcion,
                price: req.body.precio
            }, {
                where: {
                    id: req.params.id,
                },
            })
                .then(() => res.redirect("/product/listProduct"))
                .catch((errors) => console.log(console.log(errors)));
        }
    },
    delete: function (req, res) {
        db.Products.findByPk(req.params.id)
            .then((product) => res.render("deleteProd", {
                product: product
            }))
            .catch((err) => console.log(err));
    },
    destroy: function (req, res) {
        db.Products.destroy({
            where: {
                id: req.params.id,
            },
        })
            .then(() => res.redirect("/product/listProduct"))
            .catch((err) => console.log(err));
    },
    nuevosProd: (req, res) => {
        /*db.Categorys.findAll()
        .then(function([cate]) {
          res.render('nuevosProd',{cate:cate})})
        .catch((error) =>{
            res.send(error)
        })*/
        return res.render('nuevosProd')
    },

    createNewProd: function (req, res) {
        db.Products.create({
            product: req.body.producto,
            description: req.body.descripcion,
            price: req.body.precio,
            category_id: 0
          })
          .then(function () {
            res.redirect("/product/listProduct");
          })
          .catch((err) => console.log(err));
      },

    index:(req,res)=>{
        let product = productsModel.all();

        return res.render('product', {product})
    },
    
    /*nuevosProd:(req,res)=>{
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
    }*/
}


module.exports = controller;