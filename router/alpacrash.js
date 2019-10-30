const express = require('express');
const dbController = new (require('../db/alpacrash'))();
const alpacrash = express.Router();

alpacrash.get('/', dbController.getEvents);
alpacrash.post('/', dbController.addEvent);

alpacrash.get('/names', dbController.getEventNames);
alpacrash.get('/names/:event', dbController.getEventYears);
alpacrash.get('/names/:event/:year', dbController.getProjectNames);

alpacrash.get('/projects', dbController.getAllProjects);  // Needed for debug.vue
alpacrash.get('/:event/:year/', dbController.getProjects);
alpacrash.post('/:event/:year/', dbController.addProject);
alpacrash.get('/:event/:year/:project', dbController.getProject);
alpacrash.put('/:event/:year/:project', dbController.updateProject);
alpacrash.get('/:event/:year/:project/user', dbController.checkUser);
alpacrash.get('/:event/:year/:project/users', dbController.getProjectUsers);
alpacrash.post('/:event/:year/:project/users', dbController.addProjectUser);

alpacrash.get('/users', dbController.getUsers);

module.exports = alpacrash;
