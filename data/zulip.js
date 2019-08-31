const zulip = require("zulip-js");

module.exports.get = async () => {
	const config = {
		zuliprc: "./data/zuliprc"
	}

	const zulipObj = await zulip(config);
	const streams = await zulipObj.streams.retrieve();
	const stream = "alle";

	const params = {
		stream,
		type: "stream",
		anchor: 0,
		num_before: 1,
		num_after: 1
	}
	const messages = await zulipObj.messages.retrieve(params)

	return messages;
}
