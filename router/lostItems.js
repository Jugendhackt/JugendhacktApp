const express = require('express');
const dbController = new (require('../db/lostandfound'))();

const lostItems = express.Router();
lostItems.get('/', (req, res) => dbController.get(req, res));
lostItems.put('/', (req, res) => dbController.add(req, res));
lostItems.delete('/', (req, res) => dbController.delete(req, res));

module.exports = lostItems;
