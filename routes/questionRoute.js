import express from 'express';
import Question from '../schemas/questionSchema.js'

let router = express.Router();
router.route('/').get((req,res)=>{
    Question.find().then(users=> res.json(users)).catch(err => res.status(400).json('Err: '+err));
});

router.route('/:id').get((req,res)=>{
    Question.findById(req.params.id).then(users=> res.json(users)).catch(err => res.status(400).json('Err: '+err));
});

router.route('/:id').delete((req,res)=>{
    Question.findByIdAndDelete(req.params.id).then(()=>res.json('Question deleted')).catch(err => res.status(400).json('Err: '+err));
});

router.route('/add').post((req,res)=>{
    const body = req.body.body;
    const answer = req.body.answer;
    const fakes = req.body.fakes;
    const difficulty = Number(req.body.difficulty);
    const username = req.body.username;

    const newQuestion = new Question({body,answer,fakes,difficulty,username});
    newQuestion.save().then(()=>res.json('Question added')).catch(err=>res.status(400).json('Err: '+err));
});

router.route('/update/:id').put((req,res)=>{
    Question.findById(req.params.id).then(question => {
        question.body = req.body.body;
        question.answer = req.body.answer;
        question.fakes = req.body.fakes;
        question.difficulty = Number(req.body.difficulty);
        question.username = req.body.username;

        question.save().then(()=>res.json('Question updated')).catch(err=>res.status(400).json('Err: '+err));
    }).catch(err=>res.status(400).json('Err: '+err));
});

export default router;