const express = require('express');
const memoryCache = require("memory-cache");
const hackdash = require("../data/hackdash.js");
const github = require("../data/github.js");
const jh = require("../data/website.js");
const twitter = require("../data/twitter.js");
const zulip = require("../data/zulip.js");

const cache = (duration) => {
    return (req, res, next) => {
        let key = '__express__' + req.originalUrl || req.url;
        let cachedBody = memoryCache.get(key);
        if (cachedBody) {
            res.send(cachedBody);
        } else {
            res.sendResponse = res.send;
            res.send = (body) => {
                memoryCache.put(key, body, duration * 1000);
                res.sendResponse(body)
            };
            next()
        }
    }
};

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

api.get("/events", cache(600),
    async (_, res) => res.send(await jh.getEvents()));
api.get("/github", cache(600),
    async (_, res) => res.send(await github.get()));
api.get("/hackdash/board/:board", cache(600),
    async (req, res) => res.send(await hackdash.getBoardInfo(req.params.board)));
api.get("/hackdash/project/:pid", cache(600),
    async (req, res) => res.send(await hackdash.getProjectInfo(req.params.pid)));
api.get("/hackdash", cache(600),
    async (_, res) => res.send(await hackdash.listBoards()));
api.get("/twitter", cache(600),
    async (_, res) => res.send(await twitter.get()));
api.get("/zulip", cache(20),
    async (req, res) => {
        if (req.session.loggedIn && req.session.isVerified) res.send(await zulip.get());
        else res.send({});
    });
api.get("*", (_, res) => res.send(apiUrls));

module.exports = api;
