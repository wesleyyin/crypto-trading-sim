const { ObjectID } = require('bson');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//picture will be stored in FS with post ID as name
const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    posts: [{type: ObjectID, ref: 'Post'}],//post ID array
    notifications: [{type: ObjectID, ref: 'Notification'}],//notification ID array
    bio: {type: String, required: false},
    profilePic : {type: String, required: false}
},{
    timestamps: true,
});


  const User = mongoose.model('User', userSchema);
  module.exports = User;