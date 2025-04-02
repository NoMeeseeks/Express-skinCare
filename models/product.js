'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      product.belongsToMany(models.user, {
        through: 'shopping_cart',
        foreignKey: 'id_product',
      })
    }
  }
  product.init({
    product_name: DataTypes.STRING,
    description: DataTypes.STRING,
    brand: DataTypes.STRING,
    price: DataTypes.FLOAT,
    image_url: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    skincare_type: DataTypes.ARRAY(DataTypes.STRING),
    expiration_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'product',
    tableName: 'product'
  });
  return product;
};