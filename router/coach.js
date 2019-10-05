hackdash.get('/questions', dbController.getQuestions);
hackdash.post('/questions', dbController.addQuestion);

hackdash.get('/answers', dbController.getQuestions);
hackdash.post('/answers', dbController.addQuestion);