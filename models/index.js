const mongoose = require('Mongoose');
const UserModel = require('./User');
const ReviewModel = require('./Review');
const InterestModel = require('./Interest');
const ProfileModel = require('./Profile');

mongoose.connect('mongodb://localhost/fit-search');
mongoose.Promise = Promise;

module.exports = {
    UserModel,
    ReviewModel,
    InterestModel,
    ProfileModel
} 
