const mongoose = require('mongoose');
const UserModel = require('./User');
const ReviewModel = require('./Review');
const InterestModel = require('./Interest');
require('dotenv').config();

mongoose.connect(process.env.PRODUCTION_URL);

// enable promises with mongoose
mongoose.Promise = Promise;

module.exports = {
    UserModel,
    ReviewModel,
    InterestModel
} 
