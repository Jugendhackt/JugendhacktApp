const express = require('express');
const dbController = new (require('../db/alpacrash'))();
const alpacrash = express.Router();

alpacrash.get('/', (req, res) => dbController.getEvents(req, res));
alpacrash.post('/', (req, res) => dbController.addEvent(req, res));

alpacrash.get('/names', (req, res) => dbController.getEventNames(req, res));
alpacrash.get('/names/:event', (req, res) => dbController.getEventYearNums(req, res));
alpacrash.get('/names/:event/:year', (req, res) => dbController.getProjectNames(req, res));

alpacrash.get('/projects', (req, res) => dbController.getAllProjects(req, res));  // Needed for debug.vue
alpacrash.get('/:event/',(req, res) => dbController.getEventYears(req, res));
alpacrash.get('/:event/:year/', (req, res) => dbController.getProjects(req, res));
alpacrash.post('/:event/:year/', (req, res) => dbController.addProject(req, res));
alpacrash.get('/:event/:year/:project', (req, res) => dbController.getProject(req, res));
alpacrash.put('/:event/:year/:project', (req, res) => dbController.updateProject(req, res));
alpacrash.get('/:event/:year/:project/user', (req, res) => dbController.checkUser(req, res));
alpacrash.get('/:event/:year/:project/users', (req, res) => dbController.getProjectUsers(req, res));
alpacrash.post('/:event/:year/:project/users', (req, res) => dbController.addProjectUser(req, res));

alpacrash.get('/users', (req, res) => dbController.getUsers(req, res));

module.exports = alpacrash;
