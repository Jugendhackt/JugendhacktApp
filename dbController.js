const mariadb = require('mariadb');
const bCrypt = require('bcrypt');
const fs = require('fs');

const userTable = `
    CREATE TABLE IF NOT EXISTS users
    (
        id          INT                 NOT NULL AUTO_INCREMENT,
        full_name   VARCHAR(100)        NOT NULL,
        password    VARCHAR(64)         NOT NULL,
        email       VARCHAR(255) UNIQUE NOT NULL,
        birthday    DATETIME            NOT NULL,
        is_admin    BOOLEAN             NOT NULL,
        is_verified BOOLEAN             NOT NULL,
        PRIMARY KEY (id)
    )
`;

const lostItemsTable = `
    CREATE TABLE IF NOT EXISTS lost_items
    (
        id       INT          NOT NULL AUTO_INCREMENT,
        location VARCHAR(255) NOT NULL,
        what     VARCHAR(255) NOT NULL,
        img_name VARCHAR(20)  NOT NULL,
        PRIMARY KEY (id)
    )
`;

const packingListTable = `
    CREATE TABLE IF NOT EXISTS packing_list
    (
        id   INT          NOT NULL AUTO_INCREMENT,
        item VARCHAR(100) NOT NULL,
        PRIMARY KEY (id)
    )
`;

const self = module.exports = {
    // Allow multiple connections
    pool: mariadb.createPool({
        host: process.env.DBHost,
        user: process.env.DBUser,
        password: process.env.DBPassword,
        database: process.env.DBName
    }),

    /**
     * Connect to database
     * @returns conn
     */
    connect: async res => {
        try {
            return await self.pool.getConnection()
        } catch (err) {
            console.error(`Could not connect to database: ${process.env.DBName}`, err);
            if (res) res.status(500).json({success: false, message: "An error occurred"})
        }
    },

    /**
     * Initializes database tables
     */
    init: () => {
        self.connect()
            .then(conn => {
                console.log(`Connected to database: ${process.env.DBName}`);
                for (const table of [userTable, lostItemsTable, packingListTable]) {
                    conn.query(table)
                        .catch(err => {
                            console.error('Could not create table', err);
                            conn.end();
                        })
                }
                conn.end();
            })
    },

    /**
     * Creates a new user
     * @param req
     * @param resp
     */
    addUser: (req, resp) => {
        const body = req.body;
        if (body.password && body.fullName && body.email && body.birthday) {
            self.connect(resp)
                .then(conn => {
                    bCrypt.hash(req.body.password, 12, (err, password) => {
                        if (err) throw err;
                        const fullName = body.fullName.length <= 100 ? body.fullName : body.fullName.slice(0, 101);
                        conn.query("SELECT * FROM users LIMIT 1")
                            .then(res => {
                                const isAdmin = !res[0];
                                conn.query("INSERT INTO users (full_name, password, email, birthday, is_admin, is_verified) VALUE (?,?,?,?,?,?)",
                                    [fullName, password, body.email, body.birthday, isAdmin, isAdmin]
                                )
                                    .then(() => {
                                        conn.end();
                                        self.login(req, resp);
                                    })
                                    .catch(err => {
                                        console.error('Could not create user', err);
                                        resp.status(400).json({success: false, message: "User already exists"});
                                        conn.end();
                                    })
                            });
                    })
                })
        } else resp.status(400).json({success: false, message: "Wrong number of parameters"})
    },

    /**
     * Logs the user in to the system
     * @param req
     * @param resp
     */
    login: (req, resp) => {
        if (req.body.email && req.body.password) {
            self.connect(resp)
                .then(conn => {
                    conn.query("SELECT * FROM users WHERE email = ?", [req.body.email])
                        .then(res => {
                            if (bCrypt.compareSync(req.body.password, res[0].password)) {
                                req.session.loggedIn = true;
                                req.session.isAdmin = res[0].is_admin;
                                req.session.isVerified = res[0].is_verified;
                                req.session.email = res[0].email;
                                req.session.uid = res[0].id;
                                resp.json({success: true});
                            } else resp.status(400).json({
                                success: false,
                                message: "Password and/or username incorrect"
                            });
                            conn.end();
                        })
                        .catch(err => {
                            console.error('Login failed', err);
                            resp.status(400).json({success: false, message: "Password and/or username incorrect"});
                            conn.end();
                        })
                })
        } else resp.status(400).json({success: false, message: "Wrong number of parameters"})
    },

    logout: (req, res) => {
        req.session = null;
        res.redirect('/#/login');
    },

    /**
     * Checks the status of the user
     * @param req
     * @param res
     */
    checkStatus: (req, res) => {
        const userStatus = {
            loggedIn: req.session.loggedIn,
            isAdmin: req.session.isAdmin,
            isVerified: req.session.isVerified,
        };
        res.json(userStatus);
    },

    /**
     * Inverts admin status of the user
     * @param req
     * @param res
     */
    updateAdmin: (req, res) => {
        if (req.body.email) {
            const email = req.body.email;
            if (req.session.isAdmin) {
                self.connect(res)
                    .then(conn => {
                        conn.query("SELECT * FROM users WHERE is_admin = 1")
                            .then(result => {
                                if (result[1]) {
                                    conn.query("UPDATE users SET is_admin = NOT is_admin WHERE email = ?", [email])
                                        .then(() => {
                                            res.json({success: true});
                                            conn.end();
                                        })
                                        .catch(err => {
                                            console.error(err);
                                            res.status(400).json({success: false, message: "User does not exist"});
                                            conn.end();
                                        })
                                } else {
                                    conn.query("SELECT * FROM users WHERE email = ?", [email])
                                        .then(result => {
                                            if (!result[0].is_admin) {
                                                conn.query("UPDATE users SET is_admin = NOT is_admin WHERE email = ?", [email])
                                                    .then(() => {
                                                        res.json({success: true});
                                                        conn.end();
                                                    })
                                                    .catch(err => {
                                                        console.error(err);
                                                        res.status(400).json({
                                                            success: false,
                                                            message: "User does not exist"
                                                        });
                                                        conn.end();
                                                    })
                                            } else res.status(400).json({
                                                success: false,
                                                message: "Last admin user left"
                                            });
                                        })
                                }
                            })
                            .catch(err => {
                                console.error(err);
                                res.status(400).json({success: false, message: "Error"});
                                conn.end();
                            })
                    })
            } else res.status(403).json({success: false, message: "Operation not allowed"});
        } else res.status(400).json({success: false, message: "Wrong number of parameters"});
    },

    /**
     * Verifies a user
     * @param req
     * @param res
     */
    verifyUser: (req, res) => {
        if (req.body.email) {
            if (req.session.isAdmin) {
                self.connect(res).then(conn => {
                    conn.query("UPDATE users SET is_verified = true WHERE email = ?", [req.body.email])
                        .then(_ => {
                            res.json({success: true});
                            conn.end();
                        })
                        .catch(err => {
                            console.error(err);
                            res.status(400).json({success: false, message: "User does not exist"});
                            conn.end();
                        })
                })
            } else res.status(403).json({success: false, message: "Operation not allowed"});
        } else res.status(400).json({success: false, message: "Wrong number of parameters"});
    },

    /**
     * Returns all user from db
     * @param req
     * @param resp
     */
    getUsers: (req, resp) => {
        if (req.session.isAdmin) {
            self.connect()
                .then(conn => {
                    conn.query("SELECT email, full_name, is_admin, is_verified, birthday FROM users")
                        .then(res => {
                            resp.json(res);
                            conn.end();
                        })
                        .catch(err => {
                            console.error(err);
                            resp.status(500).json({success: false, message: "An error occurred"});
                            conn.end();
                        })
                })
        } else resp.status(403).json({success: false, message: "Operation not allowed"});
    },

    /**
     * Get data of logged in user
     * @param req
     * @param resp
     */
    getUser: (req, resp) => {
        if (req.session.loggedIn) {
            self.connect()
                .then(conn => {
                    conn.query("SELECT full_name, email, birthday FROM users WHERE id = ?", [req.session.uid])
                        .then(res => {
                            resp.send(res);
                            conn.end();
                        })
                        .catch(err => {
                            console.error(err);
                            resp.status(500).json({success: false, message: "An error occurred"});
                            conn.end();
                        })
                })
        }
    },

    /**
     * Update user details
     * @param req
     * @param resp
     */
    updateUserDetails: (req, resp) => {
        const body = req.body;
        if (body.email &&  body.full_name && body.birthday) {
            if (req.session.loggedIn) {
                self.connect()
                    .then(conn => {
                        bCrypt.hash(body.password, 12, (err, password) => {
                            let updateString;
                            let updateParams;
                            if (bCrypt.compareSync('', password)) { // IDK, check for body.password isn't working
                                updateString = "UPDATE users SET email = ?, full_name = ?, birthday = ? WHERE id = ? AND email = ?";
                                updateParams = [body.email, body.full_name, body.birthday, req.session.uid, req.session.email];
                            } else {
                                updateString = "UPDATE users SET email = ?, full_name = ?, birthday = ?, password = ? WHERE id = ? AND email = ?";
                                updateParams = [body.email, body.full_name, body.birthday, password, req.session.uid, req.session.email];
                            }
                            conn.query(updateString, updateParams)
                                .then(_ => {
                                    req.session.email = body.email;
                                    req.session.loggedIn = false;
                                    req.session.isAdmin = false;
                                    // TODO: Investigate wrong response although update succeeds
                                    resp.json({success: true});
                                    conn.end();
                                })
                                .catch(err => {
                                    console.error(err);
                                    resp.status(400).json({success: false, message: "Could not update user details"});
                                    conn.end();
                                })
                        });
                    })
            }
            resp.status(403).json({success: false, message: "Operation not allowed"});
        } else resp.status(400).json({success: false, message: "Wrong number of parameters"});
    },

    /**
     * Adds item to the "Lost and Found" list
     * @param req
     * @param resp
     */
    addLostItem: (req, resp) => {
        if (req.body.what && req.body.location) {
            if (req.session.isAdmin) {
                self.connect(resp)
                    .then(conn => {
                        // Maybe check file size
                        const allowedTypes = ['jpg', 'jpeg', 'png', 'webm'];
                        const image = req.files.img;
                        const imageType = image.name.split('.').reverse()[0];
                        if (allowedTypes.includes(imageType.toLowerCase())) {
                            const name = `${(new Date()).getTime()}.${imageType}`;
                            conn.query("INSERT INTO lost_items (location, what, img_name) VALUE (?,?,?)",
                                [req.body.location, req.body.what, name]
                            )
                                .then(() => {
                                    image.mv(`./uploads/lostItems/${name}`);
                                    resp.json({success: true});
                                    conn.end();
                                })
                                .catch(err => {
                                    console.error(err);
                                    resp.status(500).json({success: false, message: "Could not save image"});
                                    conn.end();
                                })
                        } else {
                            resp.json({success: false, message: "File type not allowed"});
                            conn.end();
                        }
                    })
            } else resp.status(403).json({success: false, message: "Operation not allowed"});
        } else resp.status(400).json({success: false, message: "Wrong number of parameters"});
    },

    /**
     * Get all "Lost and Found" items
     * @param req
     * @param resp
     */
    getLostItems: (req, resp) => {
        self.connect(resp)
            .then(conn => {
                conn.query("SELECT * FROM lost_items")
                    .then(res => {
                        resp.json(res);
                        conn.end()
                    })
                    .catch(err => {
                        console.error(err);
                        resp.status(500).json({success: false, message: "Unknown error"});
                        conn.end();
                    })
            })
    },

    /**
     * Deletes item from db
     * @param req
     * @param res
     */
    delLostItem: (req, res) => {
        if (req.body.img && req.body.id) {
            if (req.session.isAdmin) {
                self.connect(res)
                    .then(conn => {
                        conn.query("DELETE FROM lost_items WHERE id = ?", [req.body.id])
                            .then(() => {
                                res.json({success: true});
                                conn.end();
                                fs.unlinkSync(`./uploads/lostItems/${req.body.img}`);
                            })
                            .catch(err => {
                                console.error(err);
                                res.status(400).json({success: false, message: "Item not found", body: req.body});
                                conn.end();
                            })
                    })
            } else res.status(403).json({success: false, message: "Operation not allowed"});
        } else res.status(400).json({success: false, message: "Wrong number of parameters"});
    },

    /**
     * Adds item to packing list
     * @param req
     * @param res
     */
    addPackingListItem: (req, res) => {
        if (req.body.item) {
            if (req.session.isAdmin) {
                self.connect(res)
                    .then(conn => {
                        conn.query("INSERT INTO packing_list (item) VALUE (?)", [req.body.item])
                            .then(() => {
                                res.json({success: true});
                                conn.end();
                            })
                            .catch(err => {
                                console.error(err);
                                res.status(400).json({success: false, message: "No item sent"});
                                conn.end();
                            })
                    })
            } else res.status(403).json({success: false, message: "Operation not allowed"});
        } else res.status(400).json({success: false, message: "Wrong number of parameters"});
    },

    /**
     * Get all items from the packing list
     * @param req
     * @param resp
     */
    getPackingListItem: (req, resp) => {
        self.connect()
            .then(conn => {
                conn.query("SELECT * FROM packing_list")
                    .then(res => {
                        resp.json(res);
                        conn.end();
                    })
                    .catch(err => {
                        console.error(err);
                        resp.status(500).json({success: false, message: "Unknown error"});
                    })
            })
    },

    /**
     * Deletes item from db
     * @param req
     * @param res
     */
    delPackingListItem: (req, res) => {
        if (req.body.id) {
            if (req.session.isAdmin) {
                self.connect(res)
                    .then(conn => {
                        conn.query("DELETE FROM packing_list WHERE id = ?", [req.body.id])
                            .then(_ => {
                                res.json({success: true});
                                conn.end();
                            })
                            .catch(err => {
                                console.error(err);
                                res.status(400).json({success: true, message: "Item not found"});
                                conn.end();
                            })
                    })
            } else res.status(403).json({success: false, message: "Operation not allowed"});
        } else res.status(400).json({success: false, message: "Wrong number of parameters"});
    },
};

