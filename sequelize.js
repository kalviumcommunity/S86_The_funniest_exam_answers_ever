const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('asap_project', 'root', 'Charan@kalvium2024', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
