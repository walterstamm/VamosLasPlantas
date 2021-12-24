module.exports = function(sequelize, dataTypes) {
    let alias = "Products";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        product: {
            type: dataTypes.STRING
        },
        description: {
            type: dataTypes.STRING
        },
        category_id: {
            type: dataTypes.STRING // lo dejo?
        },
        price: {
            type: dataTypes.STRING
        }
       
    }
    let config = {
        tableName: "product",
        timestamps: false
    }

    let product = sequelize.define(alias, cols, config); 

    product.associate = function(models){
        product.belongsTo(models.Category, {
            as: 'category', 
            foreignKey: 'category_id'
        });
        product.hasMany()(models.Sale, {
            as: 'sale', 
            foreignKey: 'product_id'
        });
    }

    return product; 
}