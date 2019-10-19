const express = require('express');
const dbController = require('../dbController');
const alpacrash = express.Router();

// Events like: HH19, BER19, ...
alpacrash.get('/all', dbController.getAlpacrashEvents);
alpacrash.get('/all/names', dbController.getAlpacrashEventNames);
alpacrash.get('/', dbController.getAlpacrashEventYears);
alpacrash.put('/', dbController.addAlpacrashEvent);

// Project links
alpacrash.get('/projects/all', dbController.getAlpacrashProjects);
alpacrash.get('/project', dbController.getAlpacrashProject);
alpacrash.get('/projects', dbController.getAlpacrashEventYearProjects);
alpacrash.put('/projects', dbController.addAlpacrashProject);

alpacrash.get('/users/all', dbController.getAlpacrashUsers);
alpacrash.get('/users', dbController.getAlpacrashProjectUser);
alpacrash.put('/users', dbController.addAlpacrashUser);

module.exports = alpacrash;
