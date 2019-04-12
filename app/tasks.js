const express = require('express');

const auth = require('../middleware/auth');
const Task = require('../models/Task');

const router = express.Router();

router.post('/', auth, async (req, res) => {
    console.log(req.body);
    const task = new Task(req.body);
    // task.user = req.user._id;


    try {
        await task.save();
        return res.send(task);
    } catch (error) {
        return res.status(400).send(error);
    }
});

router.get('/', auth, (req, res) => {
    Task.find({user: req.user._id})
        .then(tasks => res.send(tasks))
        .catch(() => res.sendStatus(500))
});

module.exports = router;
