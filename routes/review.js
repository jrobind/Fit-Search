const express = require('express');
const router = express.Router();
const utils = require('../utils');
const db = require('../models/');

// create review 
router.post('/', (req, res) => {
    const { rating, body, authorName, authorId, authorAvatar } = req.body.reviewData;
    const { trainerId } = req.body;
    
    // create new review doc
    const newReview = new db.ReviewModel({
        rating: rating,
        body: body,
        authorName: authorName,
        authorId: authorId,
        authorAvatar: authorAvatar
    });
    
    // save review and then add review to trainer reviews array
    newReview.save((error, review) => {
        db.UserModel.findById(trainerId)
            .populate('reviews')
            .then((trainer) => {
                // push new review model and save
                trainer.reviews.push(review);
                trainer.reviewAverage = utils.calculateReviewAverage(trainer.reviews);
                trainer.save();
                res.json('review added');
            })
            .catch((error) => console.log(error));
    });
});


module.exports = router;