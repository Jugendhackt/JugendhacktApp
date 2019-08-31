const express = require('express');
const dbController = require('./dbController');

const lostItems = express.Router();

lostItems.get('/get', (req, res) => dbController.getLostItems(req, res));
lostItems.post('/add', (req, res) => dbController.addLostItem(req, res));
lostItems.post('/del', (req, res) => dbController.delLostItem(req, res));

module.exports = lostItems;
