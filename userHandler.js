const express = require('express');
const dbController = require('./dbController');

const user = express.Router();

user.post('/register', dbController.addUser);
user.post('/login', dbController.login);
user.get('/status', dbController.checkStatus);
user.get('/getAll', dbController.getUsers);
user.post('/addAdmin', dbController.addAdmin);

module.exports = user;
