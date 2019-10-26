const express = require('express');
const dbController = new (require('../db/packinglist'))();
const packingList = express.Router();
packingList.get('/', dbController.get);
packingList.put('/', dbController.add);
packingList.delete('/', dbController.delete);

module.exports = packingList;
