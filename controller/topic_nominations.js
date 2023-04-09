const Topic = require('../models/topic');
const Speaker = require('../models/speaker');
const TopicNominations = require('../models/topic_nominations');

async function post(req, res) {
  const nomination_date = new Date();
  const { topicId, speakerId } = req.body;
  try {
    // Check if topic exists
    const topic = await Topic.findByPk(topicId);
    if (!topic) {
      return res.status(400).json({ message: 'Topic not found' });
    }

    // Check if speaker exists
    const speaker = await Speaker.findByPk(speakerId);
    if (!speaker) {
      return res.status(400).json({ message: 'Speaker not found' });
    }

    // Check if speaker has already self-nominated for this topic
    const existingNomination = await TopicNominations.findOne({
      where: {
        TopicId: topicId,
        SpeakerId: speakerId
      }
    });
    if (existingNomination) {
      return res.status(400).json({ message: 'Speaker has already self-nominated for this topic' });
    }

    // Create self-nomination
    await TopicNominations.create({
      TopicId: topicId,
      SpeakerId: speakerId,
      nomination_date
    });

    res.status(201).json({ message: 'Self-nomination created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
    post
};
