const db = require("../../database/models");
const sequelize = db.sequelize;
const {Op} = require('sequelize');

module.exports = {
    lista: (req, res) => {
         db.Users
             .findAll()
             .then(users => {
                 return res.status(200).json({
                     meta: { 
                         status: 200,
                         total: users.length,
                         url: "/api/users"
                     },
                     data: [{ 
                         total: users.length,
                         users
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
  
    let size = 3;
    if(!Number.isNaN(sizeAsNumber) && !(sizeAsNumber > 3) && !(sizeAsNumber < 1)){
      size = sizeAsNumber;
    }
  
    const usersWithCount = await db.Users.findAndCountAll({
       /* include : [
            {association: 'Categorys'},
            ], para que me diga el nombre de la categoria*/ 

        limit: size,
        offset: page * size
    });
    
    res.json(usersWithCount.rows)

   
}
   
}