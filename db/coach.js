const dbController = require('./dbController');

class coach extends dbController {
    constructor() {
        super();
    }

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
                    console.error(err);
                    res.status(400).json({success: false, message: "Could not get questions!"});
                    conn.end();
                })
        })
    }

    getAnswers(req, res) {
        this.connect(res, conn => {
            conn.query("SELECT * FROM answers WHERE question_id = ?", [req.body.question_id])
                .then(answers => {
                    res.json(answers);
                    conn.end();
                })
                .catch(err => {
                    console.error(err);
                    res.status(400).json({success: false, message: "Could not get answers!"});
                    conn.end();
                })
        })
    }

    addQuestion(req, res) {
        if (this.validateRequest(req, res, ['title', 'text', 'topic'])) {
            if (this.auth(req, res)) {
                this.connect(res, conn => {
                    conn.query("INSERT INTO questions (user_id, title, text, topic) VALUES (?,?,?,?)",
                        [req.session.uid, req.body.title, req.body.text, req.body.topic])
                        .then(_ => {
                            res.json({success: true});
                            conn.end();
                        })
                        .catch(err => {
                            console.error(err);
                            res.status(400).json({success: false, message: "Could not add new question!"});
                            conn.end();
                        })
                })
            }
        }
    }

    addAnswer(req, res) {
        if (this.validateRequest(req, res, ['question_id', 'text'])) {
            if (this.auth(req, res)) {
                this.connect(res, conn => {
                    conn.query("INSERT INTO questions (user_id, question_id, text) VALUES (?,?,?)",
                        [req.session.uid, req.body.question_id, req.body.text])
                        .then(_ => {
                            res.json({success: true});
                            conn.end();
                        })
                        .catch(err => {
                            console.error(err);
                            res.status(400).json({success: false, message: "Could not add new answer!"});
                            conn.end();
                        })
                })
            }
        }
    }
}

module.exports = coach;
