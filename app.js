const express = require('express');
const bodyParser = require('body-parser');
const github = require("./data/github.js");

const app = express();
const PORT = process.env.PORT || 80;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const api = express.Router();
api.use("/github", (_, req) => github.get(data => req.send(data)));
app.use("/api", api);

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
