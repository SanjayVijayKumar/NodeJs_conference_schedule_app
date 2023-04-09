const Conference = require('../models/conference');

async function get(req, res, next) {
    try {
        const response = await Conference.findAll();
        res.status(200).json(response);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function post(req, res, next) {
    try {
        const { start_date, end_date } = req.body;
        req.body.start_date = new Date(start_date);
        req.body.end_date = new Date(end_date);
        await Conference.create(req.body);
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