const dbController = require('./dbController');

class alpacrash extends dbController {
    constructor() {
        super();
    }

    // Event handling

    /**
     * Get all events
     * @param req
     * @param res
     */
    getEvents(req, res) {
        this.connect(res, conn => {
            conn.query("SELECT * FROM alpacrash_event ORDER BY year DESC, name")
                .then(events => {
                    res.json(events);
                    conn.end();
                })
                .catch(err => {
                    console.error(err);
                    res.status(400).json({success: false, message: "Could not get events!"});
                    conn.end();
                })
        })
    }

    /**
     * Get all event names
     * @param req
     * @param res
     */
    getEventNames(req, res) {
        this.connect(res, conn => {
            conn.query("SELECT name FROM alpacrash_event")
                .then(eventNames => {
                    res.json(eventNames);
                    conn.end();
                })
                .catch(err => {
                    console.error(err);
                    res.status(400).json({success: false, message: "Could not get event names!"});
                    conn.end();
                })
        })
    }

    /**
     * Get all event years
     * @param req
     * @param res
     */
    getEventYears(req, res) {
        this.connect(res, conn => {
            conn.query("SELECT year FROM alpacrash_event WHERE name LIKE ? ORDER BY year DESC", [req.params.event])
                .then(years => {
                    res.json(years);
                    conn.end();
                })
                .catch(err => {
                    console.error(err);
                    res.status(400).json({success: false, message: "Could not get event years"});
                    conn.end();
                })
        })
    }

    /**
     * Add new event
     * @param req
     * @param res
     */
    addEvent(req, res) {
        if (this.validateRequest(req, res, ['name', 'year'])) {
            if (this.auth(req, res, true, true)) {
                this.connect(res, conn => {
                    conn.query("SELECT * FROM alpacrash_event WHERE name = ? AND year = ?", [req.body.name, req.body.year])
                        .then(events => {
                            if (events) {
                                res.json({success: false, message: "Event already exists!"});
                                conn.end();
                                return;
                            }
                            conn.query("INSERT INTO alpacrash_event (name, year) VALUE (?,?)", [req.body.name, req.body.year])
                                .then(_ => {
                                    res.json({success: true});
                                    conn.end();
                                })
                                .catch(err => {
                                    console.error(err);
                                    res.status(400).json({success: false, message: "Could not add event!"});
                                    conn.end();
                                })

                        });
                })
            }
        }
    }

    // Project handling

    /**
     * Get all projects
     * @param req
     * @param res
     */
    getAllProjects(req, res) {
        this.connect(res, conn => {
            conn.query("SELECT * FROM alpacrash_project")
                .then(projects => {
                    res.json(projects);
                    conn.end();
                })
                .catch(err => {
                    console.error(err);
                    res.status(400).json({success: false, message: "Could not get projects!"});
                    conn.end();
                })
        })
    }

    /**
     * Get a specific project
     * @param req
     * @param res
     */
    getProject(req, res) {
        const params = req.params;
        this.connect(res, conn => {
            conn.query(`SELECT *
                        FROM alpacrash_event
                                 LEFT JOIN alpacrash_project ap ON alpacrash_event.id = ap.event_id
                        WHERE year = ?
                          AND name LIKE ?
                          AND title = ?`,
                [params.year, params.event, params.project]
            )
                .then(projects => {
                    res.json(projects);
                    conn.end();
                })
                .catch(err => {
                    console.error(err);
                    res.status(400).json({success: false, message: "Could not get project data!"});
                    conn.end();
                })
        })
    }

    getProjectNames(req, res) {
        const params = req.params;
        this.connect(res, conn => {
            conn.query(`SELECT ap.title
                        FROM alpacrash_event
                                 LEFT JOIN alpacrash_project ap ON alpacrash_event.id = ap.event_id
                        WHERE year = ?
                          AND name LIKE ?`,
                [params.year, params.event]
            )
                .then(projectNames => {
                    res.json(projectNames);
                    conn.end();
                })
                .catch(err => {
                    console.error(err);
                    res.status(400).json({success: false, message: "Could not get project data!"});
                    conn.end();
                })
        })
    }

    /**
     * Update the project
     * @param req
     * @param res
     */
    updateProject(req, res) {
        if (this.auth(req, res)) {
            this.connect(res, conn => {
                const params = req.params;
                const body = req.body;
                conn.query(`SELECT *
                            FROM alpacrash_event
                                     LEFT JOIN alpacrash_project ap ON alpacrash_event.id = ap.event_id
                                     LEFT JOIN alpacrash_users au ON ap.id = au.project_id
                            WHERE year = ?
                              AND name LIKE ?
                              AND title = ?
                              AND user_id = ?`,
                    [params.year, params.event, params.project, req.session.uid])
                    .then(res => {
                        if (!res) {
                            res.status(400).json({success: true, message: "Unknown project"});
                            conn.end();
                            return;
                        }
                        let updateString = '';
                        let updateParams = [];
                        if (body.title) {
                            updateString += updateString ? 'AND title = ?' : 'title = ?';
                            updateParams.push(body.title);
                        }
                        if (body.description) {
                            updateString += updateString ? 'AND description = ?' : 'description = ?';
                            updateParams.push(body.description);
                        }
                        if (body.link) {
                            updateString += updateString ? 'AND link = ?' : 'link = ?';
                            updateParams.push(body.link);
                        }
                        updateParams.push(res[0].project_id);
                        if (!updateString) {
                            res.status(400).json({success: false, message: "Nothing to update!"});
                            conn.end();
                            return;
                        }
                        conn.query(`UPDATE alpacrash_project SET ${updateString} WHERE id = ?`, updateParams)
                            .then(_ => {
                                res.json({success: true});
                                conn.end();
                            })
                            .catch(err => {
                                console.error(err);
                                res.status(400).json({success: false, message: "Could not update project!"});
                                conn.end();
                            })
                    })
                    .catch(err => {
                        console.error(err);
                        res.status(400).json({success: false, message: "Wrong parameters!"});
                        conn.end();
                    })
            })
        }
    }

    /**
     * Get all projects from a specific event year
     * @param req
     * @param res
     */
    getProjects(req, res) {
        this.connect(res, conn => {
            conn.query(`SELECT *
                        FROM alpacrash_event
                                 LEFT JOIN alpacrash_project ap ON alpacrash_event.id = ap.event_id
                        WHERE name LIKE ?
                          AND year = ?`,
                [req.params.event, req.params.year])
                .then(projects => {
                    res.json(projects);
                    conn.end();
                })
                .catch(err => {
                    console.error(err);
                    res.status(400).json({success: false, message: "Could not get projects!"});
                    conn.end();
                })
        })
    }

    /**
     * Add project to event year
     * @param req
     * @param res
     */
    addProject(req, res) {
        if (this.validateRequest(req, res, ['title', 'description', 'link'])) {
            if (this.auth(req, res)) {
                const hasImage = Boolean(req.files);
                const body = req.body;
                const params = req.params;
                let image, imageType, imageName;
                if (hasImage) {
                    image = req.files.img;
                    imageType = image.name.split('.').reverse()[0];
                    imageName = `${(new Date()).getTime()}.${imageType}`
                }
                if (hasImage && !this.allowedTypes.includes(imageType.toLowerCase())) {
                    res.status(400).json({success: false, message: "File type not allowed!"});
                    return;
                }
                this.connect(res, conn => {
                    conn.query(`SELECT *
                                FROM alpacrash_event
                                         LEFT JOIN alpacrash_project ap ON alpacrash_event.id = ap.event_id
                                WHERE name LIKE ?
                                  AND year = ?`,
                        [params.name, params.year])
                        .then(projects => {
                            for (const i of projects) {
                                if (projects[i].name === body.name) {
                                    res.status(400).json({
                                        success: false,
                                        message: "Project already exists in this years event!"
                                    });
                                    conn.end();
                                    return;
                                }
                            }
                            conn.query("INSERT INTO alpacrash_project (event_id, title, img_name, `description`, link) VALUES (?,?,?,?,?)",
                                [projects[0].event_id, body.title, hasImage ? image.name : 'placeholder.jpg', body.description, body.link])
                                .then(r => {
                                    if (hasImage) image.mv(this.uploadFolder + 'alpacrash/' + imageName);
                                    this.addUserToProject(res, req.session.uid, r.insertId, conn);
                                })
                                .catch(err => {
                                    console.error(err);
                                    res.status(400).json({success: false, message: "Could not add new project"});
                                    conn.end();
                                })

                        })
                })
            }
        }
    }

    /**
     * Get all contributors of a project
     * @param req
     * @param res
     */
    getProjectUsers(req, res) {
        const params = req.params;
        this.connect(res, conn => {
            conn.query(`SELECT *
                        FROM alpacrash_event
                                 LEFT JOIN alpacrash_project ap ON alpacrash_event.id = ap.event_id
                                 LEFT JOIN alpacrash_users au on ap.id = au.project_id
                        WHERE year = ?
                          AND name LIKE ?
                          AND title = ?`,
                [params.year, params.event, params.project]
            )
                .then(users => {
                    res.json(users);
                    conn.end();
                })
                .catch(err => {
                    console.error(err);
                    res.status(400).json({success: false, message: "Could not get project users!"});
                    conn.end();
                })
        })
    }

    /**
     * Get all verified users
     * @param req
     * @param res
     */
    getUsers(req, res) {
        if (this.auth(req, res)) {
            this.connect(res, conn => {
                conn.query("SELECT * FROM users WHERE is_verified = true")
                    .then(users => {
                        res.json(users);
                        conn.end();
                    })
                    .catch(err => {
                        console.error(err);
                        res.status(400).json({success: false, message: "Could not get users!"});
                        conn.end();
                    })
            });
        }
    }

    /**
     * Checks if user is project contributor
     * @param req
     * @param res
     */
    checkUser(req, res) {
        this.connect(res, async conn => {
            const params = req.params;
            const isContrib = await this.checkUserIsContributor(params.event, params.year, params.project, req.session.uid, conn);
            res.json({isContrib});
            conn.end();
        })
    }

    /**
     * Adds new project contributor
     * @param req
     * @param res
     */
    addProjectUser(req, res) {
        if (this.validateRequest(req, res, ['uid', 'pid'])) {
            this.connect(res, async conn => {
                const params = req.params;
                const isContrib = await this.checkUserIsContributor(params.event, params.year, params.project, req.session.uid, conn);
                if (isContrib) {
                    this.addUserToProject(res, req.body.uid, req.body.pid, conn);
                    res.json({success: true});
                } else
                    res.status(403).json({
                        success: false,
                        message: "Only project contributors are allowed to add new contributors!"
                    });
                conn.end();
            })
        }
    }

    /**
     * Helper function adding an user to a project
     * @param res
     * @param uid
     * @param pid
     * @param conn
     */
    addUserToProject(res, uid, pid, conn) {
        conn.query("INSERT INTO alpacrash_users (user_id, project_id) VALUE (?,?)", [uid, pid])
            .then(_ => {
                res.json({success: true});
                conn.end();
            })
            .catch(err => {
                console.error(err);
                res.status(400).json({success: false, message: "Could not add user"});
                conn.end();
            })
    }

    /**
     * Helper function checking if user is project contributor
     * @param event
     * @param year
     * @param project
     * @param uid
     * @param conn
     */
    checkUserIsContributor(event, year, project, uid, conn) {
        conn.query(`SELECT *
                    FROM alpacrash_event
                             LEFT JOIN alpacrash_project ap on alpacrash_event.id = ap.event_id
                             LEFT JOIN alpacrash_users au on ap.id = au.project_id
                    WHERE year = ?
                      AND name = ?
                      AND title = ?
                      AND user_id = ?`,
            [year, event, project, uid])
            .then(user => Boolean(user))
            .catch(err => {
                console.error(err);
                return false
            })

    }
}

module.exports = alpacrash;
