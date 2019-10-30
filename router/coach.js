const express = require('express');
const dbController = new (require('../db/coach'))();
const coach = express.Router();

coach.get('/questions', (req, res) => dbController.getQuestions(req, res));
coach.post('/questions', (req, res) => dbController.addQuestion(req, res));

coach.get('/answers', (req, res) => dbController.getAnswers(req, res));
coach.post('/answers', (req, res) => dbController.addAnswer(req, res));

module.exports = coach;
