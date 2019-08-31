const express = require('express');
const bodyParser = require('body-parser');
const github = require("./data/github.js");
const hackdash = require("./data/hackdash.js");

const app = express();
const PORT = process.env.PORT || 80;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const api = express.Router();
const apiUrls = {
	"GitHub": "/api/github",
	"HackDash": "/api/HackDash",
	"Twitter": "/api/Twitter",
	"Zulip": "/api/Zulip"
}

api.use("/github", async (_, res) => res.send(await github.get()));
api.use("/hackdash/list", async (_, res) => res.send(await hackdash.getBoards()));
api.use("*", (_, res) => res.send(apiUrls));
app.use("/api", api);

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
