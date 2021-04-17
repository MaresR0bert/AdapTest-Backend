import express from 'express';
import User from '../schemas/userSchema.js'

let router = express.Router();
router.route('/').get((req, res) => {
    User.find().then(users => res.json(users)).catch(err => res.status(400).json('Err: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const role = req.body.role;
    const newUser = new User({ username, password, role });
    newUser.save().then(() => res.json('User added')).catch(err => res.status(400).json('Err: ' + err));
});

router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id).then(() => res.json('User deleted')).catch(err => res.status(400).json('Err: ' + err));
});

router.route('/login').post((req, res) => {
    User.find({ username: req.body.username }).then(user => {
        if (user[0].password === req.body.password) res.json({ _id: user[0]._id, role: user[0].role })
        else res.json('Authentication failed')
    }).catch(err => res.status(400).json('Err: ' + err))
})

export default router;