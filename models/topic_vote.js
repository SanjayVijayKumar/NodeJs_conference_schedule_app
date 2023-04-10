const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const TopicVote = sequelize.define('TopicVotes', {
  vote_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  vote_value: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 10
    }
  }
}, {freezeTableName: true});

module.exports = TopicVote;
