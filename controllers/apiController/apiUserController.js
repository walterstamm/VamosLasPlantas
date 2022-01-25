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
   } }