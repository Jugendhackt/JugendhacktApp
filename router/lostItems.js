const express = require('express');
const dbController = new (require('../db/lostandfound'))();

const lostItems = express.Router();
lostItems.get('/', dbController.get);
lostItems.put('/', dbController.add);
lostItems.delete('/', dbController.delete);

module.exports = lostItems;
