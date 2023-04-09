const Attendee = require('../models/attendee');

async function get(req, res, next) {
    try {
        const response = await Attendee.findAll();
        res.status(200).json(response);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function post(req, res, next) {
    try {
        await Attendee.create(req.body);
        res.status(201).json(req.body);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    get,
    post
}