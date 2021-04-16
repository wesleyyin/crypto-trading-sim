const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//picture will be stored in FS with post ID as name
const postSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    caption: {type: String, required: true},
    photoName: {type: String, required: true}
},{
    timestamps: true,
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;