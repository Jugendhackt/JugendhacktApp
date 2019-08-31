const fetch = require("node-fetch");

module.exports.start = async url => {
	try {
		const response = await fetch(url);
		return await response.json();
	} catch (error) {
		return { "error": error };
	}
}
