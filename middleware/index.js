const db = require('../models');
const utils = require('../utils');
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
            res.locals.queryResult = utils.formatQueryReturn(trainers);
            next();  
        })
        .catch((error) => console.log(error));
};

module.exports = middlewareObj;