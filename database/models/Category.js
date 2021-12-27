module.exports = function(sequelize, DataTypes) {
    let alias = "Categorys";
    
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nameCategory: {
            type: DataTypes.STRING,
        }
       
    }
    let config = {
        tableName: "category",
        timestamps: false
    }

    const Category = sequelize.define(alias, cols, config); 
    
    //     Category.associate = function (models) {
    //         Category.hasMany(models.Product, {
    //             foreignKey: 'category_id',
    //         as: 'products',
            
    //         })
    // }
    return Category; 
}
