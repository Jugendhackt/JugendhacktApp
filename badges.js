const express = require("express");
const fetch = require("node-fetch");

const badges = express.Router();

badges.get("/list", async (req, res) => {
    const response = await fetch("https://api.badgr.io/v2/badgeclasses", {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + process.env.BadgrAccess
        }
    });
    res.send((await response.json())["result"]);
});

badges.post("/add/:entity_id", async (req, res) => {
    const entityId = req.params.entity_id;
    const email = req.body.email;
    const response = await fetch("https://api.badgr.io/v2/badgeclasses/" + entityId + "/assertions", {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + process.env.BadgrAccess,
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "entityType": "BadgeClass",
            "entityId": entityId,
            "recipient": {
                "identity": email,
                "type": "email"
            }
        })
    });
    res.send(await response.json());
});

module.exports = badges;
