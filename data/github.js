const https = require("https");

module.exports.github = (callback) => {
	let output;
	const req = https.request(
		{
			host: "api.github.com/orgs/JugendHackt/repos",
			port: 443
		}, res => {
			res.on("data", chunk => output += chunk);
			res.on("end", () => callback(JSON.parse(output)));
		});

	req.on("error", err => console.error(err));
	req.end();
}
