const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const commentSchema = new Schema({
    content: {type: String, required: true},
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    post: { type: Schema.Types.ObjectId, ref: 'Post' },
    parent: { type: Schema.Types.ObjectId, ref: 'Comment' },
    
},{
    timestamps: true,
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;