const Category = require('./models/Category');
const Product = require('./models/Product');


Category.hasMany(Product,{as:'category_id',foreignKey:"category_id"});

Product.belongsTo(Category,{as:"category"});

