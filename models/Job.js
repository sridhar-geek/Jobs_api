const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema( {
    company: {
        type: String,
        required:[true,  'Please provide company name'],
        maxlength:30
    },
    position: {
        type: String,
        requried: [true, 'Please provide your position'],
        maxlength: 30
    },
    status: {
        type: String,
        enum: ['interview', 'declined', 'pending', 'Accepted'],
        default: 'pending'
    },
    createdBy:{
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: [true, 'Please provide user']
    }
}, { timestamps: true } )

module.exports = new mongoose.model('Jobs', JobSchema)