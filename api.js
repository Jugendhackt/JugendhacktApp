const express = require('express');
const hackdash = require("./data/hackdash.js");
const github = require("./data/github.js");
const jh = require("./data/website.js");
const twitter = require("./data/twitter.js");
const zulip = require("./data/zulip.js");

const api = express.Router();
const apiUrls = {
	"GitHub": "/api/github",
	"HackDash": "/api/HackDash",
	"Twitter": "/api/Twitter",
	"Zulip": "/api/Zulip"
}

api.get("/events",
	async (_, res) => res.send(await jh.getEvents()));
api.get("/github",
	async (_, res) => res.send(await github.get()));
api.get("/hackdash/board/:board",
	async (req, res) => res.send(await hackdash.getBoardInfo(req.params.board)));
api.get("/hackdash/project/:pid",
	async (req, res) => res.send(await hackdash.getProjectInfo(req.params.pid)));
api.get("/hackdash",
	async (_, res) => res.send(await hackdash.listBoards()));
api.get("/twitter",
	async (_, res) => res.send(await twitter.get()));
api.get("/zulip",
	async (_, res) => res.send(await zulip.get()));
api.get("*", (_, res) => res.send(apiUrls));

module.exports = api;
