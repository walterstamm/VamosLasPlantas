const db = require("../../database/models");
const sequelize = db.sequelize;
const {Op} = require('sequelize');

module.exports = {
    lista: (req, res) => {
         db.Products
             .findAll()
             .then(products => {
                 return res.status(200).json({
                     meta: { 
                         status: 200,
                         total: products.length,
                         url: "/api/products"
                     },
                     data: [{ 
                         total: products.length,
                         products
                     }]
                     
                 })
             })
   },
 
     show: (req, res) => {
         db.Product
             .findByPk(req.params.id)
             .then(product => {
                 return res.status(200).json({ 
                     data: product,
                     status: 200,
 
                 })
             })
     },
     almacen: (req, res) => {
         db.Product
             .creacion(req.body)
             .then(product => {
                 return res.status(200).json({ 
                     data: product,
                     status: 200,
                     created: 'Producto creado'
 
                 })
             })
         }
 }


