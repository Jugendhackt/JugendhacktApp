const request = require("./request");
const jsdom = require("jsdom");
const {JSDOM} = jsdom;

module.exports.getEvents = async () => {
    const html = await request.start("https://jugendhackt.org/events/", false);
    const dom = new JSDOM(html);
    const events = dom.window.document.querySelectorAll(".teaser-item-events");
    const eventsArr = [];
    for (event of events) {
        const object = {};
        object["img"] = event.querySelector("img.attachment-event-teaser").src;
        const dateLocation = event.querySelectorAll("h2");
        object["date"] = dateLocation[0].textContent;
        object["location"] = dateLocation[1].textContent;
        const buttons = event.querySelectorAll(".button");
        if (buttons[0].textContent === "Anmelden") {
            object["anmelden"] = buttons[0].href;
            object["information"] = buttons[1].href;
        } else {
            object["anmelden"] = "expired";
            object["information"] = buttons[0].href;
        }
        eventsArr.push(object);
    }
    return eventsArr;
};
