const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const Speaker = sequelize.define('Speaker', {
  first_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  qualification: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {freezeTableName: true});

module.exports = Speaker;
