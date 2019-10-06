require("dotenv").config();
const express = require("express");
const fileupload = require("express-fileupload");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const dbController = require("./dbController");

const api = require("./router/api");
const user = require("./router/userHandler");
const lostItems = require("./router/lostItems");
const packingList = require("./router/packingList");
const push = require("./router/push");
const badges = require("./router/badges");
const dashhack = require("./router/dashhack");
const coach = require("./router/coach");

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
app.use("/dashhack", dashhack);
app.use("/coach", coach);

app.get('*', (req, res) => {
    res.status(404).redirect("/#/404");
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
