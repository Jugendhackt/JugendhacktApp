const mariadb = require('mariadb');

const userTable = `
	CREATE TABLE IF NOT EXISTS \`users\` (
		\`id\` INT NOT NULL AUTO_INCREMENT,
		\`username\` VARCHAR(24) NOT NULL,
		\`password\` VARCHAR(64) NOT NULL,
		\`email\` VARCHAR(255) UNIQUE NOT NULL,
		\`birthday\` DATETIME NOT NULL,
		PRIMARY KEY(\`id\`)
	)
`

const self = module.exports = {
	con: mariadb.createPool({
		host: process.env.DBHost || 'localhost',
		user: process.env.DBUser || 'jha',
		password: process.env.DBPassword || 'jha',
		database: process.env.DBName || 'jha'
	}),

	init: () => {
		self.con.getConnection().then(con => {
			console.log(`Connected to ${process.env.DBName}`);
			con.query(userTable)
			.catch(err => {
				console.log(err);
				con.end();
			})
			con.end()
		}).catch(err => {
			console.log(err);
			con.end();
		})
	},
}

self.init();
