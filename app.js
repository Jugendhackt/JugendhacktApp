require("dotenv").config();
const express = require("express");
const path = require("path");
const fileupload = require("express-fileupload");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const dbController = new (require("./db/dbController"))();


const Bundler = require('parcel-bundler');

const bundler = new Bundler("./public/index.html");

const api = require("./router/api");
const user = require("./router/userHandler");
const lostItems = require("./router/lostItems");
const packingList = require("./router/packingList");
const push = require("./router/push");
const badges = require("./router/badges");
const alpacrash = require("./router/alpacrash");
const coach = require("./router/coach");

const app = express();
const PORT = process.env.PORT || 80;

app.use(fileupload({}));
app.use(express.static("dist"));
app.use("/lostitems/images", express.static("uploads/lostItems/"));
app.use("/alpacrash/images", express.static("uploads/alpacrash/"));
app.use(bodyParser.urlencoded({extended: false, limit: "50mb"}));
app.use(bodyParser.json({limit: "50mb"}));
app.use((_, res, next) => {
    res.append("Service-Worker-Allowed", "/");
    next();
});

app.use(cookieSession({
    name: 'session',
    secret: 'theBestSecretKey'  // TODO: Random key
}));

dbController.init();

app.use("/api", api);
app.use("/user", user);
app.use("/lostitems", lostItems);
app.use("/packinglist", packingList);
app.use("/push", push);
app.use("/badges", badges);
app.use("/alpacrash", alpacrash);
app.use("/coach", coach);

app.use(bundler.middleware());

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "dist/index.html"));
});


app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
