const router = require('express').Router();
let Post = require('../models/post.model');
let User = require('../models/user.model');
let ObjectID = require('mongodb').ObjectID;
const mongoose = require('mongoose');
router.route('/').get((req,res) =>{
    Post.find()
        .then(posts => res.json(posts))
        .catch(err => res.json('Error: ' + err));

});

router.route('/byuser').post((req,res) =>{
    const user = req.body.user;
    Post.find({user: user}).sort({"created_at": -1})
        .then(posts => res.json(posts))
        .catch(err => res.json('Error: ' + err));
});
//TODO add function that pushes the post ID to the user arrays
//require connections and users for operation^
router.route('/add').post((req,res) =>{
    const user = req.body.user;
    const cryptoName = req.body.name;
    const action = req.body.action;
    const quantity = Number(req.body.quantity);
    const price = Number(req.body.price);
    const newPost = new Post({
        user: user,
        cryptoName: cryptoName,
        action: action,
        quantity: quantity,
        price: price

    });
    newPost.save()
        .then(function(post){
            res.json("success");
            
            
        }
        )
        .catch(err => res.json('Error: ' + err));
}); 


router.route('/:id').get((req,res) =>{
    Post.findById(req.params.id)
        .then(post => res.json(post))
        .catch(err => res.json('Error: ' + err));
});

//TODO remember to delete photo from FS at the same time
router.route('/:id').delete((req,res) =>{
    Post.findByIdAndDelete(req.params.id)
        .then(() => res.json('Post deleted.'))
        .catch(err => res.json('Error: ' + err));
});



module.exports = router;