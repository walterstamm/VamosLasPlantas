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

   paginado: async (req, res) => {
    const pageAsNumber = Number.parseInt(req.query.page);
    const sizeAsNumber = Number.parseInt(req.query.size);
  
    let page = 0;
    if(!Number.isNaN(pageAsNumber) && pageAsNumber > 0){
      page = pageAsNumber;
    }
  
    let size = 5;
    if(!Number.isNaN(sizeAsNumber) && !(sizeAsNumber > 5) && !(sizeAsNumber < 1)){
      size = sizeAsNumber;
    }
  
    const productsWithCount = await db.Products.findAndCountAll({
       /* include : [
            {association: 'Categorys'},
            ], para que me diga el nombre de la categoria*/ 

        limit: size,
        offset: page * size
    });
    
    res.json(productsWithCount.rows)

   
}
 }


