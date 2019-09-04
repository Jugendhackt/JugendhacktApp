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
const wss = new webSocket.Server({
    port: 9001,
    path: "/wss/"
});
let clients = [];
let admins = [];
wss.on("connection", ws => {
    ws.firstMessage = true;
    ws.on("message", message => {
        try {
            const object = JSON.parse(message);
            if (ws.firstMessage) {
                ws.firstMessage = false;
                if (object["connected"]) {
                    clients.push(ws);
                    console.log("New connection -", clients.length + admins.length, "connections")
                } else if (object["admin"]) { // TODO: Add better admin verification
                    admins.push(ws);
                    console.log("New administrative connection -", clients.length + admins.length, "connections")
                }
            } else if (admins.includes(ws)) {
                clients.forEach(client => {
                    if (client !== ws) {
                        console.log("New broadcast:", object["data"]);
                        client.send(object["data"]);
                    }
                });
            } else {
                ws.send("You can't send messages!");
            }
        } catch (e) {
            ws.send("Invalid message!");
        }
    });
    ws.on("close", () => {
        clients = clients.filter(item => item !== ws);
        admins = admins.filter(item => item !== ws);
        console.log("User disconnected -", clients.length + admins.length, "connections")
    })
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
