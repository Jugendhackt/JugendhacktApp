const https = require("https");

module.exports.get = (callback) => {
	let output = "";
	const req = https.request(
		{
			host: "api.github.com",
			port: 443,
			headers: {
				"User-Agent": "JugendHackt"
			},
			path: "/orgs/JugendHackt/repos"
		}, res => {
			res.on("data", chunk => output += chunk);
			res.on("end", () => callback(JSON.parse(output)));
		});

	req.on("error", err => callback(err));
	req.end();
}
