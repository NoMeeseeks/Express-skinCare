'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    static associate(models) {
      // Define las asociaciones aquí
      product.hasMany(models.shopping_cart, {
        foreignKey: 'id_product',
        as: 'shoppingCarts'
      });
    }
  }

  product.init(
    {
      product_name: DataTypes.STRING,
      description: DataTypes.STRING,
      brand: DataTypes.STRING,
      price: DataTypes.FLOAT,
      image_url: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      skincare_type: DataTypes.STRING,
      expiration_date: DataTypes.DATE
    },
    {
      sequelize,
      modelName: 'product',
      tableName: 'products' 
    }
  );

  return product;
};
