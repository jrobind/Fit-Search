const db = require('../models');
const middlewareObj = {};

middlewareObj.checkForDuplicateEmail = (req, res, next) => {
    db.UserModel.find({email: req.body.email})
        .then((profile) => {
            if (profile.length) {
                res.json('duplicate');
                return;
            } else {
                next();
            }
        })
        .catch((error) => console.log(error));
};

middlewareObj.createInterest = (req, res, next) => {
    const { requesteeId, trainerId } = req.body;

    // find user
    db.UserModel.findById(requesteeId)
        .then((user) => {
            const newInterest = new db.InterestModel({
                requestee: user._id,
                trainerId: trainerId
            }); 
            // save new interest request
            newInterest.save()
                .then((interest) => {
                    res.locals.interest = interest;
                    next();
                });
        });
};


middlewareObj.createReview = (req, res, next) => {
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
                // push new review model and then save
                trainer.reviews.push(review);
                trainer.reviewAverage = calculateReviewAverage(trainer.reviews);
                trainer.save();
                next();
            })
            .catch((error) => console.log(error));
    });
};


const formatQueryReturn = (result) => {
    return result.map((trainer) => ({ 
        _id: trainer._id,
        profile: trainer.profile,
        reviewAverage: calculateReviewAverage(trainer.reviews)
    }));  
};

const calculateReviewAverage = (reviews) => {
    return Math.round(reviews.reduce((accumulator, currentVal) => accumulator + currentVal.rating, 0) / reviews.length);
};


middlewareObj.processSearchQuery = (req, res, next) => {
    const query = req.params.query;
    // remove '&' from query if present, seperate queries and push to a query array
    const queryArr = query.includes('&') ? query.split('&') : [query];
    
    const rates = {
        '<25': {'profile.rate': {$lt: 25}}, 
        '25-35': {'profile.rate': {$gte: 25, $lte: 35}}, 
        '35-45': {'profile.rate': {$gte: 35, $lte: 45}}, 
        '45-55': {'profile.rate': {$gte: 45, $lte: 55}}, 
        '55>': {'profile.rate': {$gt: 55}}
    };
    
    const reviewRatings = {
        '5' : {'reviewAverage': {$eq: 5}},
        '4' : {'reviewAverage': {$eq: 4}},
        '3' : {'reviewAverage': {$eq: 3}},
        '2' : {'reviewAverage': {$eq: 2}},
        '1' : {'reviewAverage': {$eq: 1}}
    }
    // construct a query array for mongoose find()
    const finalQuery = queryArr.map((query) => {
        if (query === 'trainer') {
            return {'userType': 'trainer'}
        } else if (reviewRatings[query]) {
            return reviewRatings[query];
        } else if (rates[query]) {
            return rates[query];         
        } else {
            return {'profile.region' : query};
        }
    });
    
    db.UserModel.find({$and:[...finalQuery]})
        .populate('reviews')
        .then((trainers) => {
            res.locals.queryResult = formatQueryReturn(trainers);
            next();  
        })
        .catch((error) => console.log(error));
};

module.exports = middlewareObj;