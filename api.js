const express = require('express');
const hackdash = require("./data/hackdash.js");
const github = require("./data/github.js");
const jh = require("./data/website.js");
const twitter = require("./data/twitter.js");
const zulip = require("./data/zulip.js");

const api = express.Router();
const apiUrls = {
    "Documentation": "/api",
    "GitHub": "/api/github",
    "HackDash": {
        "List dashboards": "/api/hackdash",
        "Dashboards": "/api/hackdash/board/:board",
        "Single project": "/api/hackdash/project/:project_id",
    },
    "Twitter": "/api/twitter",
    "Zulip": "/api/zulip"
};

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
    async (req, res) => {
        if (req.session.loggedIn) res.send(await zulip.get());
        else res.send({});
    });
api.get("*", (_, res) => res.send(apiUrls));

module.exports = api;
