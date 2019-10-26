const express = require('express');
const dbController = new (require('../db/alpacrash'))();
const alpacrash = express.Router();

// Events like: HH19, BER19, ...
alpacrash.get('/', dbController.getEvents);
alpacrash.post('/', dbController.addEvent);
alpacrash.get('/names', dbController.getEventNames);
alpacrash.get('/:event', dbController.getEventYears);


// Project links
alpacrash.get('/projects', dbController.getProjects);  // Debug view
alpacrash.get('/:event/:year/', dbController.getEventYearProjects);
alpacrash.post('/:event/:year/', dbController.addProject);
alpacrash.get('/:event/:year/:project', dbController.getProject);
alpacrash.put('/:event/:year/:project', dbController.updateProject);

alpacrash.get('/users/all', dbController.getAlpacrashUsers);
alpacrash.get('/users', dbController.getAlpacrashProjectUser);
alpacrash.get('/user', dbController.checkAlpacrashUser);
alpacrash.post('/users', dbController.addAlpacrashUser);

module.exports = alpacrash;
