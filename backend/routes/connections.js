const router = require('express').Router();
let Connection = require('../models/connection.model');
let ObjectID = require('mongodb').ObjectID;
router.route('/').get((req,res) =>{
    Connection.find()
        .then(connections => res.json(connections))
        .catch(err => res.status(400).json('Error: ' + err));

});

//TODO add function that pushes the post ID to the user arrays
//require connections and users for operation^
router.route('/add').post((req,res) =>{
    const userA = req.body.userA;
    const userB = req.body.userB;
    const status = 'pending';
    

    const newConnection = new Connection({
        userA,
        userB,
        status

    });
    newConnection.save()
        .then(() => res.json('Connection added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});



//TODO implement this function so it returns whether there is no connection, whether user A requested user B nad vice versa, and whether they are connected
router.route('/byusers').post((req,res) =>{
    const userA = String(req.body.userA);
    const userB = String(req.body.userB);
    console.log(userA);
    console.log(userB);

    
    if(userA== userB){
        res.json({status: "self"});
    }
    Connection.find({ $or: [ {userA: userA, userB: userB}, {userA: userB, userB: userA}] })
        .then(function(connection){
            if(connection.length){
                if(connection[0].status == 'connected'){
                    res.json({status: "connected", id: connection[0]._id});
                }
                const resUserA = connection[0].userA;
                if(resUserA.equals(userA)){
                    res.json({status: "requested", id: connection[0]._id});
                }res.json({status: "pending", id: connection[0]._id});
            }else{
                res.json({status: "not connected"});
            }
        })
        .catch(err => res.json('Error: ' + err));
});

router.route('/userreqs').post((req,res) =>{
    const userB = String(req.body.userB);

    Connection.find({userB : userB, status: 'pending'})
        .then(connections => res.json(connections))
        .catch(err => res.json('Error: ' + err));
});

router.route('/:id').get((req,res) =>{
    Connection.findById(req.params.id)
        .then(connection => res.json(connection))
        .catch(err => res.json('Error: ' + err));
});
router.route('/:id').delete((req,res) =>{
    Connection.findByIdAndDelete(req.params.id)
        .then(() => res.json('Connection deleted.'))
        .catch(err => res.json('Error: ' + err));
});

router.route('/accept/:id').post((req,res) =>{
    Connection.findById(req.params.id)
        .then(connection => {
            connection.status = 'connected';
           
            connection.save()
                .then(() => res.json('Connection Accepted!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;