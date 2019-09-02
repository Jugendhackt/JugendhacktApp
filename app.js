require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const dbController = require('./dbController');

const api = require("./api.js");
const user = require('./userHandler');
const lostItems = require('./lostItems');
const packingList = require('./packingList');

const app = express();
const PORT = process.env.PORT || 80;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use((_, res, next) => {
    res.append("Service-Worker-Allowed", "/");
    next();
});
app.use(session({
    secret: 'theBestSecretKey', // TODO: Random key
    resave: false,
    saveUninitialized: true,
    cookie: {secure: true}
}));

dbController.init();

app.use("/api", api);
app.use('/user', user);
app.use('/lostitems', lostItems);
app.use('/packinglist', packingList);

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
