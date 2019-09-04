require("dotenv").config();

const express = require("express");
const fileupload = require("express-fileupload");
const bodyParser = require("body-parser");
const session = require("express-session");
const dbController = require("./dbController");
const request = require("./data/request");

const api = require("./api.js");
const user = require("./userHandler");
const lostItems = require("./lostItems");
const packingList = require("./packingList");

const app = express();
const PORT = process.env.PORT || 80;

app.use(fileupload({}));
app.use(express.static("public"));
app.use("/lostitems/images", express.static("uploads/lostItems/"));
app.use(bodyParser.urlencoded({extended: false, limit: "50mb"}));
app.use(bodyParser.json({limit: "50mb"}));
app.use((_, res, next) => {
    res.append("Service-Worker-Allowed", "/");
    next();
});
app.use(session({
    secret: "theBestSecretKey", // TODO: Random key
    resave: true,
    saveUninitialized: true
    //cookie: {secure: true}
}));

dbController.init();

app.use("/api", api);
app.use("/user", user);
app.use("/lostitems", lostItems);
app.use("/packinglist", packingList);

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
