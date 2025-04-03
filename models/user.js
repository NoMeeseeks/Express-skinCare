'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsToMany(models.Product, {
        through: 'shopping_cart',
        foreignKey: 'id_user',
        as: 'products'
      });
      User.hasMany(models.shopping_cart, {
        foreignKey: 'id_user',
        as: 'shoppingCarts'
      });
    }
  }

  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: true // Optional field
    }
  }, {
    sequelize,
    modelName: 'user',
    tableName: 'user' // Match migration table name
  });

  return User;
};