const fetch = require("node-fetch");

module.exports.start = async (url, json=true) => {
	try {
		const response = await fetch(url);
		if (json)
			return await response.json();
		else
			return await response.text();
	} catch (error) {
		return { "error": error };
	}
}
