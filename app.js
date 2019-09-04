require("dotenv").config();

const express = require("express");
const webSocket = require("ws");
const http = require("http");
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

// WebSockets - TODO: Abstract to file
const server = http.createServer(app);
const wss = new webSocket.Server({server});
const clients = [];
const admins = [];
wss.on("connection", ws => {
    ws.firstMessage = true;
    ws.on("message", message => {
        try {
            const object = JSON.parse(message);
            if (ws.firstMessage) {
                ws.firstMessage = false;
                if (object["connected"]) {
                    clients.push(ws);
                    console.log("New connection!");
                } else if (object["admin"]) { // TODO: Add better admin verification
                    admins.push(ws);
                    console.log("New administrative connection!");
                }
            } else if (ws in admins) {
                clients.forEach(client => {
                    if (client !== ws) {
                        client.send(object["data"]);
                    }
                });
            }
        } catch (e) {
            ws.send("Invalid message!");
        }
    });
});

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
