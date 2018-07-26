'use strict';

const config = require('config');
const Sequelize = require('sequelize');

const DEFAULT_MYSQL_CONFIG = config.get('db');

const sequelize = new Sequelize(
  process.env.DB_NAME || DEFAULT_MYSQL_CONFIG.database,
  process.env.DB_USERNAME || DEFAULT_MYSQL_CONFIG.user,
  process.env.DB_PASSWORD || DEFAULT_MYSQL_CONFIG.password,
  {
    host: process.env.DB_HOST || DEFAULT_MYSQL_CONFIG.host,
    dialect: 'mysql',
    operatorsAliases: false,

    pool: {
      max: process.env.CONNECTION_LIMIT || DEFAULT_MYSQL_CONFIG.connectionLimit,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
