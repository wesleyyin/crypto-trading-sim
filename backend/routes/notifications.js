const router = require('express').Router();
let Notification = require('../models/Notification.model');

router.route('/').get((req,res) =>{
    Notification.find()
        .then(notifications => res.json(notifications))
        .catch(err => res.status(400).json('Error: ' + err));

});

router.route('/add').post((req,res) =>{
    const content = req.body.content;
    const userB = req.body.userB;
    const type = req.body.type;
    

    const newNotification = new Notification({
        userA,
        userB,
        status

    });
    newNotification.save()
        .then(() => res.json('Notification added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req,res) =>{
    Notification.findById(req.params.id)
        .then(notification => res.json(notification))
        .catch(err => res.status(400).json('Error: ' + err));
});

//TODO remember to delete photo from FS at the same time
router.route('/:id').delete((req,res) =>{
    Notification.findByIdAndDelete(req.params.id)
        .then(() => res.json('notification deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});




module.exports = router;