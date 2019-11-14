const express = require("express");
const dbController = new (require("../db/packinglist"))();
const packingList = express.Router();

packingList.get("/", (req, res) => dbController.get(req, res));
packingList.put("/", (req, res) => dbController.add(req, res));
packingList.delete("/", (req, res) => dbController.delete(req, res));

module.exports = packingList;
