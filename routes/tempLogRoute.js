import express from 'express';
import TempLog from '../schemas/tempLogSchema.js'

let router = express.Router();

router.route('/').get((req, res) => {
    TempLog.find().then(tempLog => res.json(tempLog)).catch(err => res.status(400).json('Err: ' + err));
}); //no use

router.route('/getbyname/:studname').get((req, res) => {
    TempLog.find({username:req.params.studname}).then(tempLog => tempLog.length?res.json(tempLog[0]):res.json(false)).catch(err => res.status(400).json('Err: ' + err));
}); 

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const roomCode = req.body.roomCode;
    const questionArrayRemaining = req.body.questionArrayRemaining;
    const questionArrayDone = req.body.questionArrayDone;
    const givenAnswers = req.body.givenAnswers;
    const score = req.body.score
    const teacher = req.body.teacher;
    const ascending = req.body.ascending;
    const newTempLog = new TempLog({ username, roomCode, questionArrayRemaining, questionArrayDone, givenAnswers, score, teacher, ascending });
    newTempLog.save().then(() => res.json('TempLog added')).catch(err => res.status(400).json('Err: ' + err));
});

router.route('/:id').delete((req, res) => {
    TempLog.findByIdAndDelete(req.params.id).then(() => res.json('TempLog deleted')).catch(err => res.status(400).json('Err: ' + err));
});

router.route('/deletebyname/:studname').delete((req, res) => {
    TempLog.find({username:req.params.studname}).then(tempLog => tempLog[0].delete().then(()=>res.json('TempLog deleted'))).catch(err => res.status(400).json('Err: ' + err));
});

router.route('/updatebyid/:id').put((req, res) => {
    TempLog.findById(req.params.id).then(tempLog => {
        tempLog.questionArrayRemaining = req.body.questionArrayRemaining;
        tempLog.questionArrayDone = req.body.questionArrayDone;
        tempLog.givenAnswers = req.body.givenAnswers;
        tempLog.score = req.body.score;
        tempLog.ascending = req.body.ascending;

        tempLog.save().then(() => res.json('TempLog updated')).catch(err => res.status(400).json('Err: ' + err));
    }).catch(err => res.status(400).json('Err: ' + err));
}); //no use

router.route('/updatebyname/:studname').put((req, res) => {
    TempLog.find({ username: req.params.studname }).then(tempLog => {
        tempLog[0].questionArrayRemaining = req.body.questionArrayRemaining;
        tempLog[0].questionArrayDone = req.body.questionArrayDone;
        tempLog[0].givenAnswers = req.body.givenAnswers;
        tempLog[0].score = req.body.score;
        tempLog[0].ascending = req.body.ascending;

        tempLog[0].save().then(() => res.json('TempLog updated')).catch(err => res.status(400).json('Err: ' + err));
    }).catch(err => res.status(400).json('Err: ' + err));
});

export default router;