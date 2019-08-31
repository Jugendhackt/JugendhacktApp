const express = require('express');
const bodyParser = require('body-parser');
const github = require("./data/github.js");

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

api.use("/github", (_, res) => github.get(data => res.send(data)));
api.use("*", (_, res) => res.send(apiUrls));
app.use("/api", api);

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
