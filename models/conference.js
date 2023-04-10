const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const Conference = sequelize.define('Conference', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  organizedBy: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {freezeTableName: true});

module.exports = Conference;
