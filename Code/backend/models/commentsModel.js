const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentsSchema = new mongoose.Schema({
    comment_text: {
        type: String,
        trim: true
    },
    user_id: {
        type: Schema.ObjectId,
        ref: 'User',
    },
    claim_id:{
        type: Schema.ObjectId,
        ref:'claim',
    },
},
{
        timestamps: true
}
);

const comments = mongoose.model('comments', commentsSchema);
module.exports = comments;