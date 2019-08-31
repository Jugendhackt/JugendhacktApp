const express = require('express');
const bodyParser = require('body-parser');
const api = require("./api.js");

const app = express();
const PORT = process.env.PORT || 80;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api", api);

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
