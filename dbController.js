const mariadb = require('mariadb');
const bCrypt = require('bcrypt');
const fs = require('fs');

const userTable = `
    CREATE TABLE IF NOT EXISTS users
    (
        id        INT                 NOT NULL AUTO_INCREMENT,
        full_name VARCHAR(100)        NOT NULL,
        password  VARCHAR(64)         NOT NULL,
        email     VARCHAR(255) UNIQUE NOT NULL,
        birthday  DATETIME            NOT NULL,
        is_admin  BOOLEAN             NOT NULL,
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
     * @param res
     */
    addUser: (req, res) => {
        self.connect(res)
            .then(conn => {
                bCrypt.hash(req.body.password, 12, (err, password) => {
                    if (err) throw err;
                    const fullName = req.body.fullName ? req.body.fullName.length <= 100 : req.body.fullName.slice(0, 101);
                    conn.query("INSERT INTO users (full_name, password, email, birthday, is_admin) VALUE (?,?,?,?,?)",
                        [fullName, password, req.body.email, req.body.birthday, false]
                    )
                        .then(() => {
                            res.json({success: true});
                            conn.end();
                        })
                        .catch(err => {
                            console.error('Could not create user', err);
                            res.status(400).json({success: false, message: "User already exists"});
                            conn.end();
                        })
                })
            })
    },

    /**
     * Logs the user in to the system
     * @param req
     * @param resp
     */
    login: (req, resp) => {
        self.connect(resp)
            .then(conn => {
                conn.query("SELECT * FROM users WHERE email = ?", [req.body.email])
                    .then(res => {
                        if (bCrypt.compareSync(req.body.password, res[0].password)) {
                            req.session.loggedIn = true;
                            req.session.isAdmin = res[0].is_admin;
                            resp.json({success: true});
                        } else resp.status(400).json({success: false, message: "Password and/or username incorrect"});
                        conn.end();
                    })
                    .catch(err => {
                        console.error('Login failed', err);
                        resp.status(400).json({success: false, message: "Password and/or username incorrect"});
                        conn.end();
                    })
            })
    },

    /**
     * Adds item to the "Lost and Found" list
     * @param req
     * @param resp
     */
    addLostItem: (req, resp) => {
        self.connect(resp)
            .then(conn => {
                // Maybe check file size
                const allowedTypes = ['jpg', 'jpeg', 'png', 'webm'];
                const image = req.files.img;
                const imageType = image.name.split('.').reverse()[0];
                if (allowedTypes.includes(imageType.toLowerCase())) {
                    // Possible issue with name through id caused by deleting latest item
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
                    .catch(err => {
                        console.error(err);
                        conn.end();
                        resp.status(400).json({success: false, message: "Unknown error"});
                    })
                } else {
                    resp.json({success: false, message: "File type not allowed"});
                    conn.end();
                }
            })
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
                        console.log(err);
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
        self.connect(res)
            .then(conn => {
                conn.query("DELETE FROM lost_items WHERE id = ?")
                    .then(() => {
                        res.json({success: true});
                        conn.end();
                    })
                    .catch(err => {
                        console.error(err);
                        res.status(400).json({success: true, message: "Item not found"});
                        conn.end();
                    })
            })
    },

    /**
     * Adds item to packing list
     * @param req
     * @param res
     */
    addPackingListItem: (req, res) => {
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
    },

    /*
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
                        resp.status(500).json({success: false, message: "Unkmown error"});
                    })
            })
    },

    /**
     * Deletes item from db
     * @param req
     * @param res
     */
    delPackingListItem: (req, res) => {
        self.connect(res)
            .then(conn => {
                conn.query("DELETE FROM packing_list WHERE id = ?")
                    .then(() => {
                        res.json({success: true});
                        conn.end();
                    })
                    .catch(err => {
                        console.error(err);
                        res.status(400).json({success: true, message: "Item not found"});
                        conn.end();
                    })
            })
    },
};

