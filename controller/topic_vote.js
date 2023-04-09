const Topic = require('../models/topic');
const Attendee = require('../models/attendee');
const TopicVote = require('../models/topic_vote');
const Conference = require('../models/conference');
const Speaker = require('../models/speaker');
const sequelize = require('../utils/db');

async function post(req, res) {
  const vote_date = new Date();
  const { attendeeId, topicId, vote_value } = req.body;
  try {
    // Check if topic exists
    const topic = await Topic.findByPk(topicId);
    if (!topic) {
      return res.status(400).json({ message: 'Topic not found' });
    }

    // Check if attendee exists
    const attendee = await Attendee.findByPk(attendeeId);
    if (!attendee) {
      return res.status(400).json({ message: 'Attendee not found' });
    }

    // Check if attendee has already voted for this topic
    const existingVote = await TopicVote.findOne({
      where: {
        TopicId: topicId,
        AttendeeId: attendeeId
      }
    });
    if (existingVote) {
      return res.status(400).json({ message: 'Attendee has already voted for this topic' });
    }

    // Create vote
    await TopicVote.create({
      TopicId: topicId,
      AttendeeId: attendeeId,
      vote_value,
      vote_date
    });

    res.status(201).json({ message: 'Successfully voted for a topic' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function getHighestVotedTopic(req, res) {
    try {
        // Get the topic with the highest number of votes
        const highestVotedTopic = await TopicVote.findAll({
          attributes: [
            'TopicId',
            [sequelize.fn('sum', sequelize.col('vote_value')), 'voteCount']
          ],
          group: ['TopicId'],
          order: [[sequelize.fn('sum', sequelize.col('vote_value')), 'DESC']],
          limit: 1,
          raw: true,
        });
    
        if (!highestVotedTopic[0]) {
          return res.status(404).json({ message: 'No topics found' });
        }

        const topicDetails = await Topic.findByPk(highestVotedTopic[0].TopicId, {
            include: [
              {
                model: Speaker,
              },
              {
                model: Conference,
              },
            ],
          });
    
        res.status(200).json(topicDetails);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      }
}

module.exports = {
    post,
    getHighestVotedTopic
};
