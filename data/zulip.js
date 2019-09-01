const zulip = require("zulip-js");

module.exports.get = async () => {
	const config = {
		zuliprc: "./data/zuliprc"
	}

	const zulipObj = await zulip(config);
	const streams = await zulipObj.streams.retrieve();
	const stream = "42";

	const params = {
		stream,
		type: "stream",
		anchor: 100000,
		num_before: 100,
		num_after: 0,
		narrow: [{ "operator": "stream", "operand": "ankündigungen" }]

	}
	const messages = await zulipObj.messages.retrieve(params);
	const cleaned = messages.messages.map(elem => elem.content);

	return cleaned;
}
