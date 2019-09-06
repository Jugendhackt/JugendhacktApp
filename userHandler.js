const express = require('express');
const dbController = require('./dbController');

const user = express.Router();

user.get('/status', dbController.checkStatus);
user.get('/get', dbController.getUser);
user.get('/getAll', dbController.getUsers);
user.post('/register', dbController.addUser);
user.post('/login', dbController.login);
user.put('/updateAdmin', dbController.updateAdmin);
user.put('/update', dbController.updateUserDetails);

module.exports = user;
