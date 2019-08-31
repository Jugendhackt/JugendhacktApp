const express = require('express');
const hackdash = require("./data/hackdash.js");
const github = require("./data/github.js");
const jh = require("./data/website.js");
const twitter = require("./data/twitter.js");

const api = express.Router();
const apiUrls = {
	"GitHub": "/api/github",
	"HackDash": "/api/HackDash",
	"Twitter": "/api/Twitter",
	"Zulip": "/api/Zulip"
}

api.use("/events",
	async (_, res) => res.send(await jh.getEvents()));
api.use("/github",
	async (_, res) => res.send(await github.get()));
api.use("/hackdash/list",
	async (_, res) => res.send(await hackdash.listBoards()));
api.use("/hackdash/board/:board",
	async (req, res) => res.send(await hackdash.getBoardInfo(req.params.board)));
api.use("/hackdash/project/:pid",
	async (req, res) => res.send(await hackdash.getProjectInfo(req.params.pid)));
api.use("/twitter",
	async (_, res) => res.send(await twitter.get()));
api.use("*", (_, res) => res.send(apiUrls));

module.exports = api;
