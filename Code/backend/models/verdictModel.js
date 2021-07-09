const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const verdictSchema = new mongoose.Schema({
    upcount: {
        type: Number,
        default: 0
    },
    downcount: {
        type: Number,
        default: 0
    },
    isTrue:{
        type: Boolean,
        default: false
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

const verdict = mongoose.model('verdict', verdictSchema);
module.exports = verdict;