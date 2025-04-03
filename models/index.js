'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// 1. FIRST LOAD ALL MODELS EXPLICITLY (prevents circular dependency issues)
db.user = require('./user')(sequelize, Sequelize.DataTypes);
db.product = require('./product')(sequelize, Sequelize.DataTypes);
db.shopping_cart = require('./shopping_cart')(sequelize, Sequelize.DataTypes);
db.bill = require('./bill')(sequelize, Sequelize.DataTypes);
db.detailbill = require('./detailbill')(sequelize, Sequelize.DataTypes);

// 2. THEN SET UP ASSOCIATIONS
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// 3. VERIFY MODELS ARE PROPERLY LOADED (debug)
console.log('Loaded models:', Object.keys(db).map(name => ({
  name,
  associated: !!db[name].associate
})));

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;