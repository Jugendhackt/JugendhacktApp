const express = require('express');
const dbController = require('../dbController');
const dashhack = express.Router();

// Events like: HH19, BER19, ...
dashhack.get('/all', dbController.getHackdashEvents);
dashhack.get('/', dbController.getHackdashEventYears);
dashhack.put('/', dbController.addHackdashEvent);

// Project links
dashhack.get('/projects/all', dbController.getHackdashProjects);
dashhack.get('/project', dbController.getHackdashProject);
dashhack.get('/projects', dbController.getHackdashEventYearProjects);
dashhack.put('/projects', dbController.addHackdashProject);

dashhack.get('/users/all', dbController.getHackdashUsers);
dashhack.get('/users', dbController.getHackdashProjectUser);
dashhack.put('/users', dbController.addHackdashUser);

module.exports = dashhack;
