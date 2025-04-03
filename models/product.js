'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      // Change to lowercase 'user' and explicit through table name
      Product.belongsToMany(models.user, {
        through: models.shopping_cart, // Reference the model directly
        foreignKey: 'id_product',
        as: 'users'
      });
      
      Product.hasMany(models.shopping_cart, {
        foreignKey: 'id_product',
        as: 'shoppingCarts'
      });
    }
  }

  Product.init({
    product_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0  // Ensures price isn't negative
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: true  // Optional if not all products have images
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0  // Ensures quantity isn't negative
      }
    },
    skincare_type: {
      type: DataTypes.STRING,
      allowNull: true  // Optional
    },
    expiration_date: {
      type: DataTypes.DATE,
      allowNull: true  // Optional
    }
  }, {
    sequelize,
    modelName: 'product',
    tableName: 'product'  // Singular table name
  });

  return Product;
};