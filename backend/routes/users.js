const router = require('express').Router();
const bcrypt = require("bcryptjs");
let User = require('../models/user.model');

router.route('/').get((req,res) =>{
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));

});


router.route('/:id').get((req,res) =>{
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.json('Error: ' + err));
});


router.route('/login').post((req,res) =>{
    User.find({username : req.body.username},function(err, use){
        if(err){
            res.json(err);
        }
        if (typeof use ==='undefined'||use.length==0){
            res.json({status: false, msg: use});
        }else{
            if(!bcrypt.compareSync(String(req.body.password), use[0].password)) {
                res.json({status: false, msg: 'Incorrect Username or Password'});
            }else{
                res.json({status: true, msg: 'You have logged in!', id: use[0]._id});
            } 

        }
    })
});

//check if username exists before doing anything
router.route('/register').post((req,res) =>{
    console.log("in register");
    User.find({username : req.body.username}, function (err, exists){
        if (exists.length){
            res.json({status: false, msg: 'User already exists, pick a new name.'});
        }else{
            const username = req.body.username;
            const password = bcrypt.hashSync(req.body.password, 10);
            const bio = req.body.bio;
            const resume = req.body.resume;
            const newUser = new User({
                username: username,
                password: password,
                bio: bio,
                resume: resume
            });

            newUser.save()
                .then(user => res.json({status: true, msg: 'You have logged in!', id: user._id}))
                .catch(err => res.json({status:false, msg:'Error: ' + err}));
            }
    }).catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;