const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//picture will be stored in FS with post ID as name
const notificationSchema = new Schema({
    content: {type: String, required: true},
    //the user that caused the notificaiton: for example userB commented on your post
    userB: { type: Schema.Types.ObjectId, ref: 'User' }, //use this username in combination with the type to display the relevant data
    type: {
        type: String,
        enum : ['new_comment','new_connection','new_connection_pending','time_report'],
        default: 'new_comment'
    },
},{
    timestamps: true,
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;