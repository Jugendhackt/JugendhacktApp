const request = require("./request.js");
const jsdom = require("jsdom");
const {JSDOM} = jsdom;

module.exports.get = async () => {
    console.log = () => {
    };
    console.warn = () => {
    };
    console.error = () => {
    };
    const html = await request.start("https://twitter.com/jugendhackt", false);
    const dom = new JSDOM(html);
    const tweets = dom.window.document.querySelectorAll("#stream-items-id li");
    const tweetsArr = [];
    for (let tweet of tweets) {
        let object = {};
        const text = tweet.querySelector("div .content p.TweetTextSize");
        const name = tweet.querySelector("div .content .fullname");
        const time = tweet.querySelector("div .content ._timestamp");
        const tmpPictures = tweet.querySelectorAll("img");
        const pictures = [];
        const emojis = [];
        for (const pic of tmpPictures) {
            if (pic.src.startsWith("https://abs.twimg.com/emoji/"))
                emojis.push(pic);
            else pictures.push(pic)
        }
        if (text && name.textContent.includes("hackt")) {
            object["text"] = text.textContent.substr(text.textContent.length - 26).startsWith("pic.twitter.com")
                ? text.textContent.substr(0, text.textContent.length - 26)
                : text.textContent;
            object["name"] = name.textContent;
            object["time"] = parseInt(time.getAttribute("data-time"));
            object["pictures"] = [];
            pictures.forEach(elem => object["pictures"].push(elem.getAttribute("src")));
            object["pictures"].shift();
            object["emojis"] = [];
            emojis.forEach(elem => object["emojis"].push(elem.getAttribute("src")));
            object["emojis"].shift();
            tweetsArr.push(object);
        }
    }
    return tweetsArr;
};
