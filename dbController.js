const mariadb = require('mariadb');
const bCrypt = require('bcrypt');

const userTable = `
	CREATE TABLE IF NOT EXISTS users (
		id INT NOT NULL AUTO_INCREMENT,
		full_name VARCHAR(100) NOT NULL,
		password VARCHAR(64) NOT NULL,
		email VARCHAR(255) UNIQUE NOT NULL,
		birthday DATETIME NOT NULL,
		PRIMARY KEY(id)
	)
`;

const lostItemsTable = `
	CREATE TABLE IF NOT EXISTS lost_items (
		id INT NOT NULL AUTO_INCREMENT,
		where VARCHAR(255) NOT NULL,
		what VARCHAR(255) NOT NULL,
		img_name VARCHAR(20) NOT NULL,
		PRIMARY KEY(id)
	)
`;

const self = module.exports = {
	con: mariadb.createPool({
		host: process.env.DBHost || 'localhost',
		user: process.env.DBUser || 'root',
		password: process.env.DBPassword || 'root',
		database: process.env.DBName || 'JHA'
	}),

	init: () => {
		self.con.getConnection().then(con => {
			console.log(`Connected to ${process.env.DBName}`);
			con.query(userTable)
			.catch(err => {
				console.error(err);
				con.end();
			})
			con.query(lostItemsTable)
			.catch(err => {
				console.error(err);
				con.end();
			});
			con.end()
		}).catch(err => {
			console.log(err);
			con.end();
		})
	},

	addUser: (res, req) => {
		req = req.req;
		self.con.getConnection().then(con => {
			bCrypt.hash(req.body.password, 12, (err, password) => {
				if (err) throw err;
				const username = req.body.username ? req.body.username.length <= 100 : req.body.username.slice(0, 101);
				con.query("INSERT INTO users (full_name, password, email, birthday) VALUE (?,?,?,?)",
					[req.body.fullName, password, req.body.email, req.body.birthday]
				)
			})
		})
		.then(res => {
			if (res) {
				console.log("Added new user!");
				res.json({success: true});
				con.end();
			}
		}).catch(err => {
			console.error(err);
			res.json({success: false, messege: "An error occured"});
			con.end();
		})
	},

	login: (req, resp) => {
		self.con.getConnection().then(con => {
			con.query("SELECT * FROM users WHERE email = ?", [req.body.email])
		.then(res => {
			if (res) {
				if (bCrypt.compareSync(req.body.password, res[0].password)) {
					req.session.loggedIn = true;
					req.session.isAdmin = false; // TODO: From db
					resp.redirect('/')
				} else resp.json({success: false, messege: "Username and/or password incorrect!"});
			} else resp.json({success: false, messege: "Username and/or password incorrect!"});
			con.end();
		}).catch(err => {
			console.error(err);
			resp.json({success: false, messege: "An error occured!"});
			con.end();
		})
			.catch(err => {
				console.error(err);
				resp.json({success: false, message: "An error occured!"})
				con.end();
			})
	})
	},

	addLostItem: (req, resp) => {
		self.con.getConnection().then(con => {
			const img = req.file;
			const type = img.split('.').reverse()[0];
			con.query("SELECT id FROM lost_items ORDER BY id DESC")
			.then(res => {
				let name;
				if (res) name = `${res[0].id + 1}.${type}`;
				else name = `0.${type}`;
				con.query("INSERT INTO lost_items (where, what, img_name) VALUE (?,?,?)", [req.body.where, req.body.what]);
			})
			.catch(err => {
				console.log(err);
				resp.json({success: false, message: "An error occured!"});
				con.end();
			})
		}).catch(err => {
			console.error(err);
			resp.json({success: false, message: "An error occured!"})
			con.end();
		})
	},

	getLostItems: (req, resp) => {
		self.con.getConnection().then(con => {
			con.query("SELECT * FROM lost_items")
			.then(res => resp.json(res))
			.catch(err => {
				console.error(err);
				resp.json({success: false, message: "An error occured!"})
				con.end();
			})
		})
		.catch(err => {
			console.error(err);
			resp.json({success: false, message: "An error occured!"})
			con.end();
		});
	},

	delLostItem: (req, res) => {
		self.con.getConnection().then(con => {
			con.query("DELETE FROM lost_items WHERE id = ?", [req.body.id])
			.then(() => resp.json({success: true}));
			.catch(err => {
				console.error(err);
				resp.json({success: false, message: "An error occured!"})
				con.end();
			})
		})
		.catch(err => {
			console.error(err);
			resp.json({success: false, message: "An error occured!"})
			con.end();
		})
	},

}

