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
    return category; 
}
