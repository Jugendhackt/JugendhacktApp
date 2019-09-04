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
    const body = JSON.stringify(req.body);
    let sendMessage;
    if (subscriptions.includes(body)) {
        sendMessage = "Subscription already stored";
    } else {
        subscriptions.push(body);

        sendMessage = "Subscription stored";
    }
    res.send(sendMessage);
});

push.post("/push", (req, res, next) => {
    const pushSubscription = req.body.subscription;
    const notificationMessage = req.body.message;
    console.log("New message:", notificationMessage);

    if (!pushSubscription) {
        res.status(400).send("A subscription is required");
        return next(false);
    }

    if (subscriptions.length) {
        subscriptions.map((subscription, index) => {
            let jsonSub = JSON.parse(subscription);

            webPush
                .sendNotification(jsonSub, notificationMessage)
                .then(success => handleSuccess(success, index))
                .catch(error => handleError(error, index));
        });
    } else {
        res.send("No subscribed clients found");
        return next(false);
    }

    function handleSuccess() {
        res.send("Push notification published successfully");
        return next(false);
    }

    function handleError() {
        res.status(500).send("Notification publishing failed");
        return next(false);
    }
});

module.exports = push;
