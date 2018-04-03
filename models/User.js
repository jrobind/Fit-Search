const mongoose = require('mongoose');
const ProfileSchema = require('./Profile');

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
    profile: [ProfileSchema],
    created: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;