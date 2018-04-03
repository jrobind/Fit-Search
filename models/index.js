const mongoose = require('mongoose');
const UserModel = require('./User');
const ReviewModel = require('./Review');
const InterestModel = require('./Interest');

mongoose.connect('mongodb://localhost/fit-search');
// enable promises with mongoose
mongoose.Promise = Promise;

module.exports = {
    UserModel,
    ReviewModel,
    InterestModel
} 
