const product = require("./Product")

module.exports = function(sequelize, dataTypes) {
    let alias = "Categorys";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nameCategory: {
            type: dataTypes.STRING,
        }
       
    }
    let config = {
        tableName: "category",
        timestamps: false
    }

    let category = sequelize.define(alias, cols, config); 

    category.associate = function(models) {
        category.hasMany(product, {
            as: 'product', 
            foreignKey: 'category_id' 
        });
    }

    return category; 
}
