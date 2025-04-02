'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class shopping_cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //relacion con el modelo user agregue M
      shopping_cart.belongsTo(models.User, {
        foreignKey: 'id_user',
        as: 'user'
      });

      //relacion con el modelo product agregue M
      shopping_cart.belongsTo(models.Product, {
        foreignKey: 'id_product',
        as: 'product'
      });
    }
  }
  shopping_cart.init({
    id_user: DataTypes.INTEGER,
    id_product: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'shopping_cart',
    tableName: 'shopping_cart'
  });
  return shopping_cart;
};