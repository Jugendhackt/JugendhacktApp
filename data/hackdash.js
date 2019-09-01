const https = require("https");
const request = require("./request.js");

module.exports.listBoards = async () => {
	const boards = await request.start("https://hackdash.org/api/v2/profiles/557323e279ef5d384ac04aeb");
	let dashboards = boards["dashboards"];
	dashboards = dashboards.filter(elem => elem.domain !== "testes");
	return dashboards;
}

module.exports.getBoardInfo = async board => {
	let data = await request.start("https://hackdash.org/api/v2/dashboards/" + board);
	const projects = await request.start("https://hackdash.org/api/v2/" + board + "/projects");
	data["projects"] = projects;
	return data;
}

module.exports.getProjectInfo = async project_id => {
	const data = await request.start("https://hackdash.org/api/v2/projects/" + project_id);
	return data;
}
