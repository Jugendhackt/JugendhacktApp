const express = require('express');
const dbController = require('./dbController');

const user = express.Router();

user.post('/register', (req, res) => dbController.addUser(req, res));
user.post('/login', (req, res) => dbController.login(req, res));
user.get('/status', (req, res) => dbController.checkStatus(req, res));
user.get('/getAll', dbController.getUsers);
user.post('/addAdmin', dbController.addAdmin);

module.exports = user;
