const express = require('express');
const hackdash = require("./data/hackdash.js");
const github = require("./data/github.js");

const api = express.Router();
const apiUrls = {
	"GitHub": "/api/github",
	"HackDash": "/api/HackDash",
	"Twitter": "/api/Twitter",
	"Zulip": "/api/Zulip"
}

api.use("/github",
	async (_, res) => res.send(await github.get()));
api.use("/hackdash/list",
	async (_, res) => res.send(await hackdash.listBoards()));
api.use("/hackdash/board/:board",
	async (req, res) => res.send(await hackdash.getBoardInfo(req.params.board)));
api.use("/hackdash/project/:pid",
	async (req, res) => res.send(await hackdash.getProjectInfo(req.params.pid)));
api.use("*", (_, res) => res.send(apiUrls));

module.exports = api;
