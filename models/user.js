'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.belongsToMany(models.product,{
        through: 'shopping_cart',
        foreignKey: 'id_user',
        as : 'products' //agregue m
      });
      //relacion directa con shopping_cart agregue m
      user.hasMany(models.shopping_cart, {
        foreignKey: 'id_user',
        as: 'shoppingCarts'
      });
    }
  }
  user.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    confirm_password: DataTypes.STRING,
    birthday: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'user',
    tableName: 'user'
  });
  return user;
};