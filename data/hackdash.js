const request = require("./request.js");

module.exports.listBoards = async () => {
    try {
        const boards = await request.start("https://hackdash.org/api/v2/profiles/557323e279ef5d384ac04aeb");
        let dashboards = boards["dashboards"];
        dashboards = dashboards.filter(elem => elem.domain !== "testes");
        return dashboards;
    } catch {
        return [];
    }
};

module.exports.getBoardInfo = async board => {
    try {
        let data = await request.start("https://hackdash.org/api/v2/dashboards/" + board);
        data["projects"] = await request.start("https://hackdash.org/api/v2/" + board + "/projects");
        return data;
    } catch {
        return {};
    }
};

module.exports.getProjectInfo = async project_id => {
    try {
        return await request.start("https://hackdash.org/api/v2/projects/" + project_id);
    } catch {
        return {} 
    }
};
