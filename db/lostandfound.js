const dbController = require('./dbController');
const fs = require('fs');

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
                    console.error(err);
                    res.status(400).json({success: false, message: "Unable to get items"});
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
        if (this.validateRequest(req, res, ['what', 'location'])) {
            if (this.auth(req, res, true, true)) {
                if (req.files.img) {
                    const image = req.files.img;
                    const imageType = image.name.split('.').reverse()[0];
                    if (image.size < 10 * 1024 ** 2) {  // 10MiB
                        if (this.allowedTypes.includes(imageType)) {
                            const name = `${(new Date()).getTime()}.${imageType}`;
                            this.connect(res, conn => {
                                conn.query("INSERT INTO lost_items (location, what, img_name) VALUE (?,?,?)",
                                    [req.body.location, req.body.what, name])
                                    .then(_ => {
                                        image.mv(this.uploadFolder + 'lostItems/' +  name);
                                        res.json({success: true});
                                        conn.end();
                                    })
                                    .catch(err => {
                                        console.error(err);
                                        res.status(500).json({success: false, message: "Could not save the image!"});
                                        conn.end();
                                    })
                            })
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
        if (this.validateRequest(req, res, ['img', 'id'])) {
            if (this.auth(req, res, true, true)) {
                this.connect(res, conn => {
                    conn.query("DELETE FROM lost_items WHERE id = ?", req.body.id)
                        .then(_ => {
                            res.json({success: true});
                            conn.end();
                            fs.unlinkSync(this.uploadFolder + req.body.img);
                        })
                        .catch(err => {
                            console.error(err);
                            res.status(400).json({success: false, message: "Item does not exist"});
                            conn.end();
                        })
                })
            }
        }
    }
}

module.exports = lostAndFound;
