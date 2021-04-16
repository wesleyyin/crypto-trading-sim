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
        .populate('posts')
        .populate('notifications')
        .then(user => res.json(user))
        .catch(err => res.json('Error: ' + err));
});
//pass in user ID
router.route('/pop_post').post((req,res) =>{
    User.findById(req.body.id)
        .then(user => {
            if(user.posts.length ==0){
                res.json("No more posts to pop");
            }
            user.posts.pop();
            user.save()
                .then(() => res.json('Post Popped!'))
                .catch(err => res.json('Error: ' + err));

        })
        .catch(err => res.json('Error: ' + err));
});
router.route('/findname').post((req,res) =>{
    User.find({username : req.body.username},function(err, use){
        if(err){
            res.json(err);
        }
        if (use.length==0){
            res.json({status: false, msg: "User not found"});
        }else{
            res.json({status: true, user: use[0]});
        }
    })
    

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
//updating bio
router.route('/updatebio').post((req,res) =>{
    User.find({name : req.body.username}, function (err, exists){
        if (!exists.length){
            res.json({msg: 'User DNE'});
        }else{
            exists[0].bio = req.body.bio;
            exists.save()
                .then(() => res.json('Bio updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        }
    });
});



//check if username exists before doing anything
router.route('/register').post((req,res) =>{
    console.log("in register");
    User.find({username : req.body.username}, function (err, exists){
        if (exists.length>0){
            res.json({status: false, msg: 'User already exists, pick a new name.'});
        }else{
            const username = req.body.username;
            const password = bcrypt.hashSync(req.body.password, 10);
            const posts = [];
            const notifications = [];
            const bio = req.body.bio;
            const newUser = new User({
                username,
                password,
                posts,
                notifications,
                bio
            });

            newUser.save()
                .then(user => res.json({status: true, msg: 'You have logged in!', id: user._id}))
                .catch(err => res.status(400).json({status:false, msg:'Error: ' + err}));
            }
    }).catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;