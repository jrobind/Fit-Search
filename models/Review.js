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
    authorName: {
        type: String,
    },
    authorAvatar: {
        type: String,
    },
    authorId: String
});

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;