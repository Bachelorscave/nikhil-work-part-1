const { Sequelize } = require('sequelize');
const config = require('../config/database');

// Create Sequelize instance
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.port,
    dialect: 'postgres',
    logging: process.env.DEBUG === 'true' ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

// Import models
const User = require('./user.model')(sequelize);
const Owner = require('./owner.model')(sequelize);

// Export models and sequelize instance
module.exports = {
  sequelize,
  User,
  Owner
}; 