const express = require('express');
const dbController = require('./dbController');

const user = express.Router();

user.post('/register', (req, res) => dbController.addUser(req, res));
user.post('/login' ,(req, res) => dbController.login(req, res));
module.exports = user;
