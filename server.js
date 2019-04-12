const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const config = require('./config');
const users = require('./app/users');
const tasks = require('./app/tasks');

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

mongoose.connect(config.dbUrl, config.mongoOptions)
    .then(() => {
        app.use('/users', users);
        app.use('/tasks', tasks);

        app.listen(port, () => {
            console.log(`Server started on ${port} port`);
        });

    });
