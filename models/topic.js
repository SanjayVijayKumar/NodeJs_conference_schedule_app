const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const Topic = sequelize.define('Topic', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {freezeTableName: true});

module.exports = Topic;
