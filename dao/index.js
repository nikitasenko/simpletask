'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const sequelize = require('./../common/sequelize');

const basename = path.basename(__filename);
const db = {};

function isSchema(schema) {
  return schema.indexOf('.') !== 0 && schema !== basename && schema !== 'handler.js' && schema.slice(-3) === '.js';
}

fs
  .readdirSync(__dirname)
  .filter(file => file.slice(-3) !== '.js')
  .forEach((file) => {

    const pathToLayer = path.join(__dirname, file);

    fs.readdirSync(path.join(__dirname, file))
      .filter(isSchema)
      .forEach((item) => {
        const model = sequelize.import(path.join(pathToLayer, item));
        db[model.name] = model;
      });
  });

Object.keys(db).forEach(modelName => {

  if (db[modelName].associate) {
    db[modelName].associate(db);
  }

  if (db[modelName].addScopes) {
    db[modelName].addScopes(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
