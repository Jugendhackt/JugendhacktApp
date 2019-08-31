const express = require('express');
const dbController = require('./dbController');
const packingList = express.Router();

packingList.get('/get', (req, res) => dbController.getPackingListItem(req, res));
packingList.post('/add', (req, res) => dbController.addPackingListItem(req, res));
packingList.post('/del', (req, res) => dbController.delPackingListItem(req, res));

module.exports = packingList;
