const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const evidenceSchema = new mongoose.Schema( {
    evidence: {
        type: String,
        trim: true
    },
    url: {
        type: String,
        trim: true
    },
    claim: {
        type: Schema.ObjectId,
        ref: 'claim',
    },
    source:{
        type: String,
    },
    upcount: {
        type: Number,
        default: 0
    },
    downcount: {
        type: Number,
        default: 0
    },
    verdict:{
        type: String,
        default: "false"
    },
    // claim_id:{
    //     type: Schema.ObjectId,
    //     ref:'claim',
    // },

},
{timestamps: true}
);

const evidence = mongoose.model('evidence', evidenceSchema);
module.exports = evidence;