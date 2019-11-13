const dbController = require("./dbController");

class packingList extends dbController {
    constructor() {
        super();
    }

    /**
     * Get all packing list items
     * @param req
     * @param res
     */
    get(req, res) {
        this.connect(res, conn => {
            conn.query("SELECT * FROM packing_list")
                .then(items => {
                    res.json(items);
                    conn.end();
                })
                .catch(err => {
                    console.error(err);
                    res.status(400).json({success: false, message: "Unable to get items"});
                    conn.end();
                })
        });
    }

    /**
     * Add new packing list item
     * @param req
     * @param res
     */
    add(req, res) {
        if (this.validateRequest(req, res, ["item"])) {
            if (this.auth(req, res, true, true)) {
                this.connect(res, conn => {
                    conn.query("INSERT INTO packing_list (item) VALUE (?)", [req.body.item])
                        .then(() => {
                            res.json({success: true});
                            conn.end();
                        })
                        .catch(err => {
                            console.error(err);
                            res.status(400).json({success: false, message: "Cannot add new item!"});
                            conn.end();
                        })
                })
            }
        }
    }

    /**
     * Delete packing list item
     * @param req
     * @param res
     */
    delete(req, res) {
        if (this.validateRequest(req, res, ["id"])) {
            if (this.auth(req, res, true, true)) {
                this.connect(res, conn => {
                    conn.query("DELETE FROM packing_list WHERE id = ?", [req.body.id])
                        .then(() => {
                            res.json({success: true});
                            conn.end();
                        })
                        .catch(err => {
                            console.error(err);
                            res.status(400).json({success: false, message: "Item does not exist"});
                            conn.end();
                        });
                });
            }
        }
    }
}

module.exports = packingList;
