'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Bill extends Model {
    static associate(models) {
      // Use lowercase 'user' if that's how it's registered in db
      Bill.belongsTo(models.user, {
        foreignKey: 'id_user',
        as: 'user'
      });
      
      // Use lowercase 'detailbill' if that's the model name
      Bill.hasMany(models.detailbill, {
        foreignKey: 'id_bill',
        as: 'details'
      });
    }
  }

  Bill.init({
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pending' // e.g., 'pending', 'paid', 'shipped'
    },
    payment_method: {
      type: DataTypes.STRING,
      allowNull: false // e.g., 'credit_card', 'paypal'
    },
    purchase_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'bill',
    tableName: 'bill'
  });

  return Bill;
};