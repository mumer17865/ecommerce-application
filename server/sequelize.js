// sequelize.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('testdatabase', 'root', 'Haball@1234#', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
