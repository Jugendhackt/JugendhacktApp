const express = require('express');
const dbController = require('../dbController');
const hackdash = express.Router();

hackdash.get('/', dbController.getHackdashEvents);
hackdash.put('/', dbController.addHackdashEvent);

hackdash.get('/projects', dbController.getHackdashEventProjects);
hackdash.put('/projects', dbController.addHackdashProject);

hackdash.get('/users', dbController.getHackdashProjectUser);
hackdash.put('/users', dbController.addHackdashUser);

module.exports = hackdash;
