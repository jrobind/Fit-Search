const mongoose = require('mongoose');

// Profile schema
const ProfileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    rate: Number,
    region: String,
    base: String,
    radius: Number,
    notes: String,
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }],
    reviewAverage: Number,  
});

module.exports = ProfileSchema;