const request = require("./request.js");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

module.exports.get = async () => {
	const html = await request.start("https://twitter.com/jugendhackt", false)
	const dom = new JSDOM(html);
	const tweets = dom.window.document.querySelectorAll("#stream-items-id li");
	const tweetsArr = [];
	for (tweet of tweets) {
		object = {};
		const text = tweet.querySelector("div .content p.TweetTextSize");
		const name = tweet.querySelector("div .content .fullname")
		if (text && name.textContent.includes("hackt")) {
			object["text"] = text.textContent;
			object["name"] = name.textContent;
			tweetsArr.push(object);
		}
	}
	return tweetsArr;
}