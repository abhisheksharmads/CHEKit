const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const claimSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: Schema.ObjectId,
        ref: 'category',
    },
    isfact:{
        type: Boolean,
        required: true,
        default: false
    },
    source:{
        type: String,
       // required: true,
        trim: true
    },
    user_id: {
        type: Schema.ObjectId,
        ref: 'User',
    },
    hit_counter: {
        type: Number,
        default: 0
    }
},
{
    timestamps: true
});


const claim = mongoose.model('claim', claimSchema);
module.exports = claim;