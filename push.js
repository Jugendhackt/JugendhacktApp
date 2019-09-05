// Web push - TODO: Abstract to file
// const vapidKeys = webPush.generateVAPIDKeys();
// console.log(vapidKeys.publicKey, vapidKeys.privateKey);

const express = require("express");
const webPush = require("web-push");
const bodyParser = require("body-parser");

const push = express.Router();

let vapidKeys = {
    publicKey: process.env.publicKey,
    privateKey: process.env.privateKey
};

webPush.setVapidDetails("mailto:jugendhackt@marvinborner.de", vapidKeys.publicKey, vapidKeys.privateKey);

let subscriptions = [];

push.use(bodyParser.json());

push.get("/public", (_, res) => res.send(vapidKeys.publicKey));

push.post("/subscribe", (req, res) => {
    console.log("New subscription!");
    const body = req.body;
    let sendMessage;
    if (subscriptions.includes(body)) {
        sendMessage = "Subscription already stored";
    } else {
        subscriptions.push(body);
        sendMessage = "Subscription stored";
    }
    res.send(sendMessage);
});

push.post("/send", function (req, res) {
    // if (req.session.isAdmin) { TODO: Make /push/send only available for admins @Lars
    const message = JSON.stringify(req.body.message);
    console.log("New message:", message);

    if (subscriptions.length) {
        subscriptions.forEach(subscription => {
            webPush.sendNotification(subscription, message)
                .then(_ => handleSuccess())
                .catch(err => handleError(err));
        });
    } else {
        res.send("No subscribed clients found");
    }

    function handleSuccess() {
        res.send("Push notification published successfully");
    }

    function handleError(err) {
        console.error(err);
    }

    // }
});

module.exports = push;
