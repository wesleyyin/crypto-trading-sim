const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//picture will be stored in FS with post ID as name
const postSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    cryptoName: {type: String, required: true},
    action : {type: String, enum : ['BUY, SELL'], default: 'BUY'},
    quantity: {type: Number, required: true}, //
    price: {type: Number, required: true}
    
},{
    timestamps: true,
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;