const express = require('express');
const dbController = require('./dbController');

const lostItems = express.Router();

lostItems.get('/get', dbController.getLostItems(req, res));
lostItems.add('/add', dbController.addLostItem(req, res));
lostItems.add('/del', dbController.delLostItem(req, res));

module.exports = lostItems;
