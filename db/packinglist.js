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
                    this.handleError(err, "Unable to get items", res);
                    conn.end();
                });
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
                            this.handleError(err, "Cannot add new item", res);
                            conn.end();
                        });
                });
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
                            this.handleError(err, "Item does not exist", res);
                            conn.end();
                        });
                });
            }
        }
    }
}

module.exports = packingList;
