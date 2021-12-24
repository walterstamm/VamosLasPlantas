module.exports = function(sequelize, dataTypes) {
    let alias = "Sales";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: {
            type: dataTypes.STRING
        },
        product_id: {
            type: dataTypes.STRING
        },
        date_sales: {
            type: dataTypes.STRING
        },
        quantity_products: {
            type: dataTypes.TINYINT
        }
       
    }

    let config = {
        tableName: "sales",
        timestamps: false
    }

    let sales = sequelize.define(alias, cols, config); 

    sales.associate = function(models){
        sales.belongsTo(models.Product, {
            as: 'product', 
            foreignKey: 'product_id',
        });
        sales.belongsTo(models.Usuario, {
            as: 'usuario', 
            foreignKey: 'user_id',
        });
    }

    return sales; 
}