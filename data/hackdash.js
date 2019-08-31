const https = require("https");
const request = require("./request.js");

async function list() {
	const boards = await request.start("https://hackdash.org/api/v2/users/557323e279ef5d384ac04aeb");
	return boards["admin_in"];
}

module.exports.getBoards = async () => {
	const boards = await list();
	const result = [];
	for (board of boards) {
		const data = await request.start("https://hackdash.org/api/v2/dashboards/" + board);
		result.push(data);
	}
	return result;
}
