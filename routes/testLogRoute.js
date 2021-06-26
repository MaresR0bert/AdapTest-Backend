import express from 'express';
import TestLog from '../schemas/testlogSchema.js';
import Question from '../schemas/questionSchema.js'

let router = express.Router();

router.route('/getbyname/:studname').get((req, res) => {
    TestLog.find({student:req.params.studname}).then(testLog => testLog.length?res.json(testLog):res.json(false)).catch(err => res.status(400).json('Err: ' + err));
}); 

router.route('/add').post((req, res) => {
    const student = req.body.student;
    const roomCode = req.body.roomCode;
    const questionArray = req.body.questionArray;
    const givenAnswers = req.body.givenAnswers;
    const score = req.body.score;
    const teacher = req.body.teacher;
    const newTestLog = new TestLog({ student, roomCode, questionArray, givenAnswers, score, teacher });
    newTestLog.save().then(() => res.json('TestLog added')).catch(err => res.status(400).json('Err: ' + err));
});

router.route('/:id').delete((req, res) => {
    TestLog.findByIdAndDelete(req.params.id).then(() => res.json('TestLog deleted')).catch(err => res.status(400).json('Err: ' + err));
});

router.route('/getallquestionsbyname/:studname').get((req, res) => {
    TestLog.find({student:req.params.studname}).then(testLog =>{
        let mergedFilledQuestionsArray = []
        for(let i of testLog){
            mergedFilledQuestionsArray = mergedFilledQuestionsArray.concat(i.questionArray);
        }
        Question.find().where('_id').in(mergedFilledQuestionsArray).exec().then(questions => {
            return res.json(questions)
        }).catch(err => res.status(400).json('Err: ' + err))
    }).catch(err => res.status(400).json('Err: ' + err));
}); 

export default router;