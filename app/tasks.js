const express = require('express');

const auth = require('../middleware/auth');
const Task = require('../models/Task');

const router = express.Router();

router.post('/', auth, async (req, res) => {
    const task = new Task(req.body);
    task.user = req.user._id;

    try {
        await task.save();
        return res.send(task);
    } catch (error) {
        return res.status(400).send(error)
    }
});

router.get('/', auth, (req, res) => {
    Task.find({user: req.user._id})
        .then(tasks => res.send(tasks))
        .catch(() => res.sendStatus(500));
});

router.put('/:id', auth, async (req, res) => {
    try {
        await Task.updateOne(
            {
                _id: req.params.id
            },
            {
                title: req.body.title,
                description: req.body.description,
                status: req.body.status,
            }
        );
        return res.sendStatus(200);
    } catch (error) {
        return res.status(400).send(error)
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        await Task.deleteOne({_id: req.params.id});
        return res.sendStatus(200);
    } catch (error) {
        return res.status(400).send(error);
    }
});

module.exports = router;
