const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'bachelors_cave',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgre'
});

// Database configuration for Sequelize
module.exports = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'bachelors_cave',
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgre'
};

// Export pool for direct queries
module.exports.pool = pool;
module.exports.query = (text, params) => pool.query(text, params); 