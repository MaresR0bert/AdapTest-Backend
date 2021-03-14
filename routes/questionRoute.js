import express from 'express';
import Question from '../schemas/questionSchema.js'

let router = express.Router();

function mergeAnswers(questions){
    return questions.map(question =>{
        let answers = question.wrongAnswers + "," +question.rightAnswers
        return {
            "_id":question._id,
            "questionBody":question.questionBody,
            "answers":answers,
            "difficulty":question.difficulty,
            "username":question.username
        }
    })
}

router.route('/implicitanswers/').get((req,res)=>{
    Question.find().then(questions=> res.json(mergeAnswers(questions))).catch(err => res.status(400).json('Err: '+err));
});

router.route('/explicitanswers/').get((req,res)=>{
    Question.find().then(questions=> res.json(questions)).catch(err => res.status(400).json('Err: '+err));
});

router.route('/:id').get((req,res)=>{
    Question.findById(req.params.id).then(questions=> res.json(questions)).catch(err => res.status(400).json('Err: '+err));
});

router.route('/:id').delete((req,res)=>{
    Question.findByIdAndDelete(req.params.id).then(()=>res.json('Question deleted')).catch(err => res.status(400).json('Err: '+err));
});

router.route('/add').post((req,res)=>{
    const questionBody = req.body.questionBody;
    const rightAnswers = req.body.rightAnswers;
    const wrongAnswers = req.body.wrongAnswers;
    const difficulty = Number(req.body.difficulty);
    const username = req.body.username;

    const newQuestion = new Question({questionBody,rightAnswers,wrongAnswers,difficulty,username});
    newQuestion.save().then(()=>res.json('Question added')).catch(err=>res.status(400).json('Err: '+err));
});

router.route('/update/:id').put((req,res)=>{
    Question.findById(req.params.id).then(question => {
        question.questionBody = req.body.questionBody;
        question.rightAnswers = req.body.rightAnswers;
        question.wrongAnswers = req.body.wrongAnswers;
        question.difficulty = Number(req.body.difficulty);
        question.username = req.body.username;

        question.save().then(()=>res.json('Question updated')).catch(err=>res.status(400).json('Err: '+err));
    }).catch(err=>res.status(400).json('Err: '+err));
});

export default router;