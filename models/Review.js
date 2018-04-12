const mongoose = require('mongoose');

// Review schema
const ReviewSchema = mongoose.Schema({
    rating: {
      type: Number,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    authorName: String,
    authorAvatar: String,
    authorId: String,
    dateCreated: {
        type: Date,
        default: Date.now()
    }
});

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;