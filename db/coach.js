const dbController = require("./dbController");

class coach extends dbController {
    constructor() {
        super();
    }

    /**
     * Get all questions
     * @param req
     * @param res
     */
    getQuestions(req, res) {
        this.connect(res, conn => {
            conn.query(`SELECT questions.id, user_id, title, text, topic, users.full_name
                        FROM questions
                                 JOIN users ON questions.user_id = users.id`)
                .then(questions => {
                    res.json(questions);
                    conn.end();
                })
                .catch(err => {
                    this.handleError(err, "Could not get questions", res);
                    conn.end();
                })
        })
    }

    /**
     * Get all answers to a question
     * @param req
     * @param res
     */
    getAnswers(req, res) {
        this.connect(res, conn => {
            conn.query("SELECT * FROM answers WHERE question_id = ?", [req.body.question_id])
                .then(answers => {
                    res.json(answers);
                    conn.end();
                })
                .catch(err => {
                    this.handleError(err, "Could not get answers", res);
                    conn.end();
                })
        })
    }

    /**
     * Add a new question
     * @param req
     * @param res
     */
    addQuestion(req, res) {
        if (this.validateRequest(req, res, ["title", "text", "topic"])) {
            if (this.auth(req, res)) {
                this.connect(res, conn => {
                    conn.query("INSERT INTO questions (user_id, title, text, topic) VALUES (?,?,?,?)",
                        [req.session.uid, req.body.title, req.body.text, req.body.topic])
                        .then(() => {
                            res.json({success: true});
                            conn.end();
                        })
                        .catch(err => {
                            this.handleError(err, "Could not add question", res);
                            conn.end();
                        })
                });
            }
        }
    }

    /**
     * Add a new answer to a question
     * @param req
     * @param res
     */
    addAnswer(req, res) {
        if (this.validateRequest(req, res, ["question_id", "text"])) {
            if (this.auth(req, res)) {
                this.connect(res, conn => {
                    conn.query("INSERT INTO questions (user_id, question_id, text) VALUES (?,?,?)",
                        [req.session.uid, req.body.question_id, req.body.text])
                        .then(() => {
                            res.json({success: true});
                            conn.end();
                        })
                        .catch(err => {
                            this.handleError(err, "Could not add answer", res);
                            conn.end();
                        });
                });
            }
        }
    }
}

module.exports = coach;
