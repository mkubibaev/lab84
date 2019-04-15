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

router.get('/', auth, async (req, res) => {
    try {
        const tasks = await Task.find({user: req.user._id});
        return res.send(tasks);
    } catch (error) {
        return res.status(400).send(error);
    }
});

router.put('/:id', auth, async (req, res) => {
    try {
        const updateTask = await Task.findById(req.params.id);
        updateTask.title = req.body.title;
        updateTask.description = req.body.description;
        updateTask.status = req.body.status;

        await updateTask.save();
        return res.send(updateTask);
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
