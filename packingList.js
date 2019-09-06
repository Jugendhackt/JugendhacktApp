const express = require('express');
const dbController = require('./dbController');
const packingList = express.Router();
packingList.get('/', dbController.getPackingListItem);
packingList.put('/', dbController.addPackingListItem);
packingList.delete('/', dbController.delPackingListItem);

module.exports = packingList;
