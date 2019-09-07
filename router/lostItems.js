const express = require('express');
const dbController = require('../dbController');
const lostItems = express.Router();
lostItems.get('/', dbController.getLostItems);
lostItems.put('/', dbController.addLostItem);
lostItems.delete('/', dbController.delLostItem);

module.exports = lostItems;
