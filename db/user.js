const dbController = require("./dbController");
const bCrypt = require("bcrypt");
const dns = require("dns");

class userController extends dbController {
    constructor() {
        super();
    }

    /**
     * Get system status of the user
     * @param req
     * @param res
     */
    checkStatus(req, res) {
        res.json({
            loggedIn: req.session.loggedIn,
            isAdmin: req.session.isAdmin,
            isVerified: req.session.isVerified,
        })
    }

    /**
     * Get info about current user
     * @param req
     * @param res
     */
    getUser(req, res) {
        if (this.auth(req, res, false)) {
            this.connect(res, conn => {
                conn.query("SELECT full_name, email, birthday FROM users WHERE id = ?", [req.session.uid])
                    .then(user => {
                        res.json({success: true, data: user});
                        conn.end();
                    })
                    .catch(err => {
                        this.handleError(err, "Invalid user", res);
                        conn.end();
                    })
            });
        }
    }

    /**
     * Get data of all users
     * @param req
     * @param res
     */
    getUsers(req, res) {
        if (this.auth(req, res, true, true)) {
            this.connect(res, conn => {
                conn.query("SELECT id, email, full_name, is_admin, is_verified, birthday FROM users")
                    .then(users => {
                        res.json({success: true, data: users});
                        conn.end();
                    })
                    .catch(err => {
                        this.handleError(err, "Cannot get users", res);
                        conn.end();
                    })
            });
        }
    }

    /**
     * Add new user
     * @param req
     * @param res
     */
    addUser(req, res) {
        console.log(req.body);
        if (this.validateRequest(req, res, ["password", "fullName", "email", "birthday"])) {
            const body = req.body;
            this.connect(res, conn => {
                bCrypt.hash(body.password, 12, (err, pwd) => {
                    if (err) {
                        this.handleError(err, "Error creating password hash", res, 500);
                        conn.end();
                        return;
                    }
                    const fullName = body.fullName.length <= 100 ? body.fullName : body.fullName.slice(0, 101);
                    conn.query("SELECT * FROM users LIMIT 1")
                        .then(user => {
                            const isAdmin = !user[0];
                            const domain = body.email.split("@")[1];
                            dns.resolve(domain, "MX", (err, addresses) => {
                                if (err || !addresses && addresses.length <= 0) {
                                    this.handleError(err, "Email couldn't get verified", res);
                                    conn.end();
                                    return;
                                }
                                conn.query("INSERT INTO users (full_name, password, email, birthday, is_admin, is_verified) VALUE (?,?,?,?,?,?)",
                                    [fullName, pwd, body.email, body.birthday, isAdmin, isAdmin]
                                )
                                    .then(() => {
                                        conn.end();
                                        this.login(req, res);
                                    })
                                    .catch(err => {
                                        this.handleError(err, "User already exist", res);
                                        conn.end();
                                    })
                            })
                        })
                        .catch(err => {
                            this.handleError(err, "Cannot get user", res);
                            conn.end();
                        })
                });
            });
        }
    }

    /**
     * Logs the user in
     * @param req
     * @param res
     */
    login(req, res) {
        if (this.validateRequest(req, res, ["email", "password"])) {
            this.connect(res, conn => {
                conn.query("SELECT * FROM users WHERE email = ?", [req.body.email])
                    .then(user => {
                        bCrypt.compare(req.body.password, user[0].password, (err, checkPwd) => {
                            if (err) {
                                this.handleError(err, "Error validating password hash", res);
                                conn.end();
                                return;
                            }
                            if (checkPwd) {
                                req.session.loggedIn = true;
                                req.session.isAdmin = user[0].is_admin;
                                req.session.isVerified = user[0].is_verified;
                                req.session.email = user[0].email;
                                req.session.uid = user[0].id;
                                res.json({success: true});
                            } else res.status(400).json({success: false, message: "Wrong email and/or password!"});
                            conn.end();
                        })
                    })
                    .catch(err => {
                        this.handleError(err, "Wrong email and/or password", res);
                        conn.end();
                    })
            });
        }
    }

    /**
     * Logs the user out
     * @param req
     * @param res
     */
    logout(req, res) {
        req.session = null;  // Break session
        res.redirect("/#/login");
    }

    /**
     * Updates users admin status
     * @param req
     * @param res
     */
    updateAdmin(req, res) {
        if (this.validateRequest(req, res, ["email"])) {
            if (this.auth(req, res, true, true)) {
                this.connect(res, conn => {
                    conn.query("SELECT * FROM users WHERE is_admin = true")
                        .then(users => {
                            if (users.length > 1) this.updateAdminState(req, res, conn);
                            else {
                                conn.query("SELECT * FROM users WHERE email = ?", [req.body.email])
                                    .then(user => {
                                        if (!user[0].is_admin) this.updateAdminState(req, res, conn);
                                        else {
                                            conn.end();
                                            res.json({success: false, message: "Can't remove last admin user!"});
                                        }
                                    })
                                    .catch(err => {
                                        this.handleError(err, "User does not exist", res);
                                        conn.end();
                                    })
                            }
                        })
                        .catch(err => {
                            this.handleError(err, "Cannot get users", res);
                            conn.end();
                        })
                })
            }
        }
    }

    /**
     * Updates the users credentials
     * @param req
     * @param res
     */
    updateUserCredentials(req, res) {
        if (this.validateRequest(req, res, ["email", "full_name", "birthday"])) {
            if (this.auth(req, res, false)) {
                this.connect(res, conn => {
                    const body = req.body;
                    bCrypt.hash(body.password, 12, (err, pwd) => {
                        if (err) {
                            this.handleError(err, "Error creating password hash", res);
                            conn.end();
                            return;
                        }
                        const domain = body.email.split("@")[1];
                        dns.resolve(domain, "MX", (err, addresses) => {
                            if (err || !addresses && addresses.length <= 0) {
                                this.handleError(err, "Email couldn't get verified", res);
                                conn.end();
                                return;
                            }
                            let updateString = "";
                            let updateParams = [];
                            if (body.password !== undefined) {
                                updateString = "UPDATE users SET email = ?, password = ?, full_name = ?, birthday = ? WHERE email = ? AND id = ?";
                                updateParams = [body.email, pwd, body.full_name, body.birthday, req.session.email, req.session.uid];
                            } else {
                                updateString = "UPDATE users SET email = ?, full_name = ?, birthday = ? WHERE email = ? AND id = ?";
                                updateParams = [body.email, body.full_name, body.birthday, req.session.email, req.session.uid];
                            }
                            conn.query(updateString, updateParams)
                                .then(() => {
                                    req.session.email = body.email;
                                    res.json({success: true});
                                    conn.end();
                                })
                                .catch(err => {
                                    this.handleError(err, "Could not update user credentials", res);
                                    conn.end();
                                })
                        })
                    })
                })
            }
        }
    }

    /**
     * Verifies the user
     * @param req
     * @param res
     */
    verifyUser(req, res) {
        if (this.validateRequest(req, res, ["email"])) {
            if (this.auth(req, res, true, true)) {
                this.connect(res, conn => {
                    conn.query("UPDATE users SET is_verified = true WHERE email = ?", [req.body.email])
                        .then(() => {
                            conn.end();
                            res.json({success: true});
                        })
                        .catch(err => {
                            this.handleError(err, "User does not exist", res);
                            conn.end();
                        })
                });
            }
        }
    }

    /**
     * Helper function actually updating database state
     * @param req
     * @param res
     * @param conn
     */
    updateAdminState(req, res, conn) {
        conn.query("UPDATE users SET is_admin = NOT is_admin WHERE email = ?", [req.body.email])
            .then(() => {
                res.json({success: true});
                conn.end();
            })
            .catch(err => {
                this.handleError(err, "User does not exist", res);
                conn.end();
            });
    }

}

module.exports = userController;
