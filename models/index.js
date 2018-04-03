const mongoose = require('mongoose');
const UserModel = require('./User');
const ReviewModel = require('./Review');
const InterestModel = require('./Interest');

mongoose.connect('mongodb://localhost/fit-search');

mongoose.Promise = Promise;

module.exports = {
    UserModel,
    ReviewModel,
    InterestModel
} 
