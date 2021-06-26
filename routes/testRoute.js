import express from 'express';
import Test from '../schemas/testSchema.js'

let router = express.Router();

router.route('/getbyroomcode/:roomcode').get((req, res) => {
    Test.find({roomCode:req.params.roomcode}).then(test => test.length?res.json(test[0]):res.json(false)).catch(err => res.status(400).json('Err: ' + err));
}); 

router.route('/getallroomcodes/').get((req,res)=>{
    Test.find().then(tests => tests.length?res.json(tests.map(t =>{
        return t.roomCode
    })):res.json(false)).catch(err => res.status(400).json('Err: ' + err));
})

router.route('/getbyname/:username').get((req, res) => {
    Test.find({teacher:req.params.username}).then(test => test.length?res.json(test):res.json(false)).catch(err => res.status(400).json('Err: ' + err));
}); 

router.route('/add').post((req, res) => {
    const roomCode = req.body.roomCode;
    const questionArray = req.body.questionArray;
    const teacher = req.body.teacher;
    const newTest = new Test({ roomCode, questionArray, teacher });
    newTest.save().then(() => res.json('Test added')).catch(err => res.status(400).json('Err: ' + err));
});

router.route('/:id').delete((req, res) => {
    Test.findByIdAndDelete(req.params.id).then(() => res.json('Test deleted')).catch(err => res.status(400).json('Err: ' + err));
});

export default router;