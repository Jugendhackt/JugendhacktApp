const express = require('express');
const dbController = require('../dbController');
const coach = express.Router();

coach.get('/questions', dbController.getQuestions);
coach.post('/questions', dbController.addQuestion);

coach.get('/answers', dbController.getAnswers);
coach.post('/answers', dbController.addAnswer);

module.exports = coach;
