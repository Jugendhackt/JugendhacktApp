const express = require('express');
const dbController = require('../dbController');
const dashhack = express.Router();

// Events like: HH19, BER19, ...
dashhack.get('/', dbController.getHackdashEvents);
dashhack.put('/', dbController.addHackdashEvent);

// Project links
dashhack.get('/projects', dbController.getHackdashEventProjects);
dashhack.put('/projects', dbController.addHackdashProject);

dashhack.get('/users', dbController.getHackdashProjectUser);
dashhack.put('/users', dbController.addHackdashUser);

module.exports = dashhack;
