import express from 'express';
import TempLog from '../schemas/tempLogSchema.js'

let router = express.Router();

router.route('/').get((req, res) => {
    TempLog.find().then(tempLog => res.json(tempLog)).catch(err => res.status(400).json('Err: ' + err));
}); //no use

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const questionArray = req.body.questionArray;
    const answers = req.body.answers;
    const score = Number(req.body.score);
    const newTempLog = new TempLog({ username, questionArray, answers, score });
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
        tempLog.username = req.body.username;
        tempLog.questionArray = req.body.questionArray;
        tempLog.answers = req.body.answers;
        tempLog.score = Number(req.body.score);

        tempLog.save().then(() => res.json('TempLog updated')).catch(err => res.status(400).json('Err: ' + err));
    }).catch(err => res.status(400).json('Err: ' + err));
}); //no use

router.route('/updatebyname/:studname').put((req, res) => {
    TempLog.find({ username: req.params.studname }).then(tempLog => {
        tempLog[0].questionArray = req.body.questionArray;
        tempLog[0].answers = req.body.answers;
        tempLog[0].score = Number(req.body.score);

        tempLog[0].save().then(() => res.json('TempLog updated')).catch(err => res.status(400).json('Err: ' + err));
    }).catch(err => res.status(400).json('Err: ' + err));
});

export default router;