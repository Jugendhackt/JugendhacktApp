const express = require('express');
const dbController = new (require('../db/user'))();

const user = express.Router();

user.get('/status', dbController.checkStatus);
user.get('/get', dbController.getUser);
user.get('/getAll', dbController.getUsers);
user.post('/register', dbController.addUser);
user.post('/login', dbController.login);
user.get('/logout', dbController.logout);
user.put('/updateAdmin', dbController.updateAdmin);
user.put('/update', dbController.updateUserCredentials);
user.put('/verify', dbController.verifyUser);

module.exports = user;
