'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
      user.hasMany(models.shopping_cart, {
        foreignKey: 'id_user',
        as: 'shoppingCarts'
      });
    }
  }

  user.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      confirm_password: DataTypes.STRING,
      birthday: DataTypes.DATE
    },
    {
      sequelize,
      modelName: 'user',
      tableName: 'users'
    }
  );

  return user;
};
