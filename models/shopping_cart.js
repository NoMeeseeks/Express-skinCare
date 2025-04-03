'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class shopping_cart extends Model {
    static associate(models) {
      shopping_cart.belongsTo(models.user, {
        foreignKey: 'id_user',
        as: 'user',
      });

      shopping_cart.belongsTo(models.product, {
        foreignKey: 'id_product',
        as: 'product',
      });
    }
  }

  shopping_cart.init(
    {
      id_user: DataTypes.INTEGER,
      id_product: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'shopping_cart',
      tableName: 'shopping_carts',
    }
  );

  return shopping_cart;
};
