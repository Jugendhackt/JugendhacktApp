const request = require("./request");

module.exports.get = async () => {
    return await request.start("https://api.github.com/orgs/JugendHackt/repos")
};
