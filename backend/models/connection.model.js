const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//picture will be stored in FS with post ID as name
const connectionSchema = new Schema({
    userA: { type: Schema.Types.ObjectId, ref: 'User' },
    userB: { type: Schema.Types.ObjectId, ref: 'User' },
    status: {
        type: String,
        enum : ['pending','connected'],
        default: 'pending'
    },
},{
    timestamps: true,
});

const Connection = mongoose.model('Connection', connectionSchema);

module.exports = Connection;