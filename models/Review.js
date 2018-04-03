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
    authorId: String
});

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;