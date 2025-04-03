'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class DetailBill extends Model {
    static associate(models) {
      DetailBill.belongsTo(models.bill, {
        foreignKey: 'id_bill',
        as: 'bill'
      });
      
      DetailBill.belongsTo(models.product, {
        foreignKey: 'id_product',
        as: 'product'
      });
    }
  }

  DetailBill.init({
    id_bill: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'bill',
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
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1
      }
    },
    unit_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0
      }
    }
  }, {
    sequelize,
    modelName: 'detailbill',
    tableName: 'detail_bill' // Explicit table name to match your image
  });

  return DetailBill;
};