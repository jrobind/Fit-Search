const mongoose = require('mongoose');

// Interest schema
const InterestSchema = mongoose.Schema({
    requestee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    trainerId: {
        type: String,
        required: true
    }
});

const Interest = mongoose.model('Interest', InterestSchema);

module.exports = Interest;