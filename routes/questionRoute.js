import express from 'express';
import Question from '../schemas/questionSchema.js'

let router = express.Router();

function mergeAnswersArrays(questions) {
    return questions.map(question => {
        let answers = question.rightAnswers.concat(question.wrongAnswers);
        return {
            "_id": question._id,
            "questionBody": question.questionBody,
            "answers": answers,
            "difficulty": question.difficulty,
            "username": question.username
        }
    })
}

function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

router.route('/implicitanswersofuser/:name').get((req, res) => {
    Question.find({ username: req.params.name }).then(questions => res.json(mergeAnswersArrays(questions))).catch(err => res.status(400).json('Err: ' + err));
});

router.route('/implicitanswers/').get((req, res) => {
    Question.find().then(questions => res.json(mergeAnswersArrays(questions))).catch(err => res.status(400).json('Err: ' + err));
});

router.route('/explicitanswersofuser/:name/').get((req, res) => {
    Question.find({ username: req.params.name }).then(questions => res.json(questions)).catch(err => res.status(400).json('Err: ' + err));
});

router.route('/explicitanswers/').get((req, res) => {
    Question.find().then(questions => res.json(questions)).catch(err => res.status(400).json('Err: ' + err));
}); //no use

router.route('/:id').get((req, res) => {
    Question.findById(req.params.id).then(questions => res.json(questions)).catch(err => res.status(400).json('Err: ' + err));
});

router.route('/:id').delete((req, res) => {
    Question.findByIdAndDelete(req.params.id).then(() => res.json('Question deleted')).catch(err => res.status(400).json('Err: ' + err));
});

router.route('/check/:id/').post((req, res) => {
    Question.findById(req.params.id).then(question => {
        if (arraysEqual(question.rightAnswers, req.body.answer)) res.json('Correct');
        else res.json('Wrong');
    }).catch(err => res.status(400).json('Err: ' + err));
})

router.route('/add').post((req, res) => {
    const questionBody = req.body.questionBody;
    const rightAnswers = req.body.rightAnswers;
    const wrongAnswers = req.body.wrongAnswers;
    const difficulty = Number(req.body.difficulty);
    const username = req.body.username;

    const newQuestion = new Question({ questionBody, rightAnswers, wrongAnswers, difficulty, username });
    newQuestion.save().then(() => res.json('Question added')).catch(err => res.status(400).json('Err: ' + err));
});

router.route('/update/:id').put((req, res) => {
    Question.findById(req.params.id).then(question => {
        question.questionBody = req.body.questionBody;
        question.rightAnswers = req.body.rightAnswers;
        question.wrongAnswers = req.body.wrongAnswers;
        question.difficulty = Number(req.body.difficulty);
        question.username = req.body.username;

        question.save().then(() => res.json('Question updated')).catch(err => res.status(400).json('Err: ' + err));
    }).catch(err => res.status(400).json('Err: ' + err));
});

export default router;