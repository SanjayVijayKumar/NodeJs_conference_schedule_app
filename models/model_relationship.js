const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const Topic = require('./topic');
const Speaker = require('./speaker');
const Attendee = require('./attendee');
const TopicVote = require('./topic_vote');
const TopicNominations = require('./topic_nominations');
const Conference = require('./conference');


function syncModels() {
    Topic.belongsToMany(Speaker, { through: TopicNominations });
    Speaker.belongsToMany(Topic, { through: TopicNominations });

    Topic.belongsToMany(Attendee, { through: TopicVote });
    Attendee.belongsToMany(Topic, { through: TopicVote });

    Conference.hasMany(Topic);
    Topic.belongsTo(Conference);

    return sequelize.sync({ force: true });
}

module.exports = syncModels;