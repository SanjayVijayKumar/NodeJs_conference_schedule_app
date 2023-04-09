const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const TopicNominations = sequelize.define('TopicNominations', {
  nomination_date: {
    type: DataTypes.DATE,
    allowNull: false
  }
});

module.exports = TopicNominations;
