module.exports = function(sequelize, DataTypes) {
    let alias = "Products";
    
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        product: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        category_id: {
            type: DataTypes.INTEGER
            

        },
        price: {
            type: DataTypes.STRING
        },
        imageName: {
            type: DataTypes.STRING
        },
       
    }
    let config = {
        tableName: "product",
        timestamps: false
    }

    const product = sequelize.define(alias, cols, config); 
    
    // product.associate = function (models){
    //     product.belongsTo(models.Category,{
    //         foreignKey: 'category_id',
    //         as:'category_id',
    //     })
    // }

    return product; 
}