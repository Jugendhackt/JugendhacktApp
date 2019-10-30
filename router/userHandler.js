const express = require('express');
const dbController = new (require('../db/user'))();

const user = express.Router();

user.get('/status', (req, res) => dbController.checkStatus(req, res));
user.get('/get', (req, res) => dbController.getUser(req, res));
user.get('/getAll', (req, res) => dbController.getUsers(req, res));
user.post('/register', (req, res) => dbController.addUser(req, res));
user.post('/login', (req, res) => dbController.login(req, res));
user.get('/logout', (req, res) => dbController.logout(req, res));
user.put('/updateAdmin', (req, res) => dbController.updateAdmin(req, res));
user.put('/update', (req, res) => dbController.updateUserCredentials(req, res));
user.put('/verify', (req, res) => dbController.verifyUser(req, res));

module.exports = user;
