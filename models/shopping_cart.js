'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class shopping_cart extends Model {
    static associate(models) {
      shopping_cart.belongsTo(models.User, {
        foreignKey: 'id_user',
        as: 'user'
      });
      shopping_cart.belongsTo(models.Product, {
        foreignKey: 'id_product',
        as: 'product'
      });
    }
  }

  shopping_cart.init({
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',  // Matches the table name
        key: 'id'
      }
    },
    id_product: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'product',
        key: 'id'
      }
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false  // Price at time of adding to cart
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1  // At least 1 item
      }
    }
  }, {
    sequelize,
    modelName: 'shopping_cart',
    tableName: 'shopping_cart'
  });

  return shopping_cart;
};