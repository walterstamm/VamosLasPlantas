module.exports = function(sequelize, dataTypes) {
    let alias = "Users";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: dataTypes.STRING
        },
        last_name: {
            type: dataTypes.STRING
        },
        email: {
            type: dataTypes.STRING
        },
        password: {
            type: dataTypes.STRING
        },
        imageName: {
            type: dataTypes.STRING
        },
        admin: {
            type: dataTypes.TINYINT,
        },
       
    }

    let config = {
        tableName: "users",
        timestamps: false
    }

    let Usuario = sequelize.define(alias, cols, config); 
    return Usuario; 
}