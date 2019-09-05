// Web push - TODO: Abstract to file
// const vapidKeys = webPush.generateVAPIDKeys();
// console.log(vapidKeys.publicKey, vapidKeys.privateKey);

const express = require("express");
const webPush = require("web-push");

const push = express.Router();

const vapidKeys = {
    publicKey: process.env.publicKey,
    privateKey: process.env.privateKey
};

webPush.setVapidDetails("mailto:jugendhackt@marvinborner.de", vapidKeys.publicKey, vapidKeys.privateKey);

const subscriptions = [];

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

push.post("/send", (req, res) => {
    if (req.session.isAdmin) { // TODO: Make /push/send only available for admins @Lars; Works at least for me (@Lars)
        const message = JSON.stringify(req.body.message);
        console.log("New message:", message);

        if (subscriptions.length) {
            subscriptions.forEach(subscription => {
                webPush.sendNotification(subscription, message)
                    .then(_ => res.send("Push notification published successfully"))
                    .catch(err => { // TODO: Error: cannot set headers
                        console.error(err);
                        res.json({success: false, message: "Cannot send message"});
                    });
            });
        } else res.send("No subscribed clients found");
    } else res.json({success: false, message: "Operation not allowed"});
});

module.exports = push;
