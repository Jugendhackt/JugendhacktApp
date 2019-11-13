const mariadb = require("mariadb");
const tables = require("./tables");

class dbController {
    constructor() {
        this.pool = mariadb.createPool({
            host: process.env.DBHost,
            user: process.env.DBUser,
            password: process.env.DBPassword,
            database: process.env.DBName
        });
        this.allowedTypes = ["jpg", "jpeg", "png", "webm"];
        this.uploadFolder = "../uploads/";
    }

    /**
     * Initialize database tables
     */
    init() {
        this.pool.getConnection()
            .then(conn => {
                console.log(`Connected to database: ${process.env.DBName}`);
                for (const table of tables) {
                    conn.query(table)
                        .catch(err => {
                            console.error("Could not create table:", table, err);
                            conn.end();
                        });
                }
                conn.end();
            }).catch(console.error);
    }

    /**
     * Connect to database
     * @param res
     * @param cb
     */
    connect(res, cb) {
        this.pool.getConnection()
            .then(conn => {
                cb(conn);
            })
            .catch(err => {
                console.error(err);
                res.json({success: false, message: "Cannot connect to database"});
            });
    }

    /**
     * Verifies request user
     * @param req
     * @param res
     * @param needsVerification
     * @param needsAdmin
     * @returns {boolean}
     */
    auth(req, res, needsVerification = true, needsAdmin = false) {
        if (needsAdmin && req.session.loggedIn && req.session.isVerified && req.session.isAdmin ||
            needsVerification && req.session.loggedIn && req.session.isVerified ||
            req.session.loggedIn) {
            return true;
        } else {
            res.status(403).json({success: false, message: "Not allowed!"});
            return false;
        }
    }

    /**
     * Check for params in request
     * @param req
     * @param res
     * @param params
     * @param reqBody
     * @returns {boolean}
     */
    validateRequest(req, res, params, reqBody = true) {
        const body = reqBody ? req.body : req.query;
        let isValid = true;
        for (const param of params) {
            if (!body.hasOwnProperty(param)) {
                isValid = false;
                break;
            }
        }
        if (!isValid) {
            res.status(400).json({success: false, message: "Wrong request parameters!"});
            return false;
        }
        return true;
    }
}

module.exports = dbController;
