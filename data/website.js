const request = require("./request");
const jsdom = require("jsdom");
const {JSDOM} = jsdom;

module.exports.getEvents = async () => {
    const html = await request.start("https://jugendhackt.org/events/", false);
    const dom = new JSDOM(html);

    const events = dom.window.document.querySelectorAll(".c-events-list ul");
    const eventsArr = [];
    for (event of events) {
        const object = {};
        try {
            object["img"] = event.querySelector(".events-list-item picture source").srcset.slice(0, -12) + ".jpg"; // high quality!
            object["location"] = event.querySelector(".events-list-item .events-list-body .events-list-title a").textContent;
            const buttons = event.querySelectorAll(".events-list-actions a");

            if (buttons[1].textContent === " Anmelden") { // Thx for the space @JH!
                object["anmelden"] = buttons[1].href;
                object["information"] = buttons[0].href;
            } else {
                object["anmelden"] = "expired";
                object["information"] = buttons[0].href;
            }
            object["date"] = event.getElementsByTagName("time")[0].textContent; // at the end because this seems to fail quite often?!
        } catch (e) {
            // Jugend hackt has a new website again!
        }
        eventsArr.push(object);
    }
    return eventsArr;
};
