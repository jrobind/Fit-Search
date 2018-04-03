const mongoose = require('mongoose');

// User schema
const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    userType: String,
    profile: {
        name: String,
        avatar: String,
        bio: String,
        rate: Number,
        region: String,
        base: String,
        radius: Number,
        notes: String,
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }],
    reviewAverage: Number
});

const User = mongoose.model('User', userSchema);

module.exports = User;