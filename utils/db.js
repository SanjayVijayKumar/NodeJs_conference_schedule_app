const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('ConferenceScheduler', 'root', 'Admin@123!', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;