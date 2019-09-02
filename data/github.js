const request = require("./request.js");

module.exports.get = async () => {
    return await request.start("https://api.github.com/orgs/JugendHackt/repos")
};
