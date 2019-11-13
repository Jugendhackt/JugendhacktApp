const dbController = require("./dbController");
const fs = require("fs");

class lostAndFound extends dbController {
    constructor() {
        super();
    }

    /**
     * Get all lost and found items
     * @param req
     * @param res
     */
    get(req, res) {
        this.connect(res, conn => {
            conn.query("SELECT * FROM lost_items")
                .then(items => {
                    res.json(items);
                    conn.end();
                })
                .catch(err => {
                    this.handleError(err, "Unable to get items", res);
                    conn.end();
                })
        });
    }

    /**
     * Add a new lost and found item
     * @param req
     * @param res
     */
    add(req, res) {
        if (this.validateRequest(req, res, ["what", "location"])) {
            if (this.auth(req, res, true, true)) {
                if (req.files.img) {
                    const image = req.files.img;
                    const imageType = image.name.split(".").reverse()[0];
                    if (image.size < 10 * 1024 ** 2) {  // 10MiB
                        if (this.allowedTypes.includes(imageType)) {
                            const name = `${(new Date()).getTime()}.${imageType}`;
                            this.connect(res, conn => {
                                conn.query("INSERT INTO lost_items (location, what, img_name) VALUE (?,?,?)",
                                    [req.body.location, req.body.what, name])
                                    .then(() => {
                                        image.mv(this.uploadFolder + "lostItems/" + name);
                                        res.json({success: true});
                                        conn.end();
                                    })
                                    .catch(err => {
                                        this.handleError(err, "Could not save the image", res);
                                        conn.end();
                                    })
                            });this.handleError(err, , res);
                        }
                    }
                }
            }
        }
    }

    /**
     * Deletes a lost and found item
     * @param req
     * @param res
     */
    delete(req, res) {
        if (this.validateRequest(req, res, ["img", "id"])) {
            if (this.auth(req, res, true, true)) {
                this.connect(res, conn => {
                    conn.query("DELETE FROM lost_items WHERE id = ?", req.body.id)
                        .then(() => {
                            res.json({success: true});
                            conn.end();
                            fs.unlinkSync(this.uploadFolder + req.body.img);
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

module.exports = lostAndFound;
