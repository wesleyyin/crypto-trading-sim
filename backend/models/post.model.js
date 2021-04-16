const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//picture will be stored in FS with post ID as name
const postSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    companyName: {type: String, required: true},
    roleName: {type: String, required: true},
    caption: {type: String, required: false},
    contactInfo: {type: String, required: true},
},{
    timestamps: true,
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;