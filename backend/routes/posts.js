const router = require('express').Router();
let Post = require('../models/post.model');
let User = require('../models/user.model');
let Connection = require('../models/connection.model');
let ObjectID = require('mongodb').ObjectID;
const mongoose = require('mongoose');
router.route('/').get((req,res) =>{
    Post.find()
        .then(posts => res.json(posts))
        .catch(err => res.status(400).json('Error: ' + err));

});
router.route('/byuser').post((req,res) =>{
    const user = req.body.user;
    Post.find({user:ObjectID(user)}).sort({"created_at": 1})
        .then(posts => res.json(posts))
        .catch(err => res.status(400).json('Error: ' + err));
});
//TODO add function that pushes the post ID to the user arrays
//require connections and users for operation^
router.route('/add').post((req,res) =>{
    const user = req.body.user;
    const caption = req.body.caption;
    const photoName = req.body.photoName;
    console.log(caption);
    const newPost = new Post({
        user: user,
        caption: caption,
        photoName: photoName

    });
    newPost.save()
        .then(function(post){
            helper(post,function(err,ret){
                if(err){
                    res.json('Error: ' + err);
                }res.json("post added!");
            })
            
            
        }
        )
        .catch(err => res.json('Error: ' + err));
}); 
//TODO: implement callbacks for this
function helper(post,cb){

    Connection.find({ userA: post.user , status :'connected'})
        .then(connections =>helperA(connections, post,cb))
        .catch(err => cb(err));
    Connection.find({ userB: post.user , status :'connected'})
        .then(connections =>helperB(connections, post,cb))
        .catch(err => cb(err));

}
function helperA(connections,post,cb){

    connections.forEach(function(connection){
        User.findById(connection.userB)
        .then(user=> {
            
            console.log(user.username);
            user.posts.push(post._id);
            user.save();
            
            
        }).catch(err => cb(err));
    });cb(null,"post added");

}
function helperB(connections,post,cb){

    connections.forEach(function(connection){
        User.findById(connection.userA)
        .then(user=> {
            console.log(user.username);
            user.posts.push(post._id);
            user.save();
            
        }).catch(err => cb(err));
    });cb(null,"post added");

}

router.route('/:id').get((req,res) =>{
    Post.findById(req.params.id)
        .then(post => res.json(post))
        .catch(err => res.status(400).json('Error: ' + err));
});

//TODO remember to delete photo from FS at the same time
router.route('/:id').delete((req,res) =>{
    Post.findByIdAndDelete(req.params.id)
        .then(() => res.json('Post deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req,res) =>{
    Post.findById(req.params.id)
        .then(post => {
            post.user = req.body.user;
            post.caption = req.body.caption;
            post.save()
                .then(() => res.json('Post updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;