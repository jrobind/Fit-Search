const express = require('express');
const router = express.Router();
const db = require('../models/');
const middleware = require('../middleware');

// get all trainer profiles via search query
router.get('/trainers/:query', middleware.processSearchQuery, (req, res) => {
    res.json(res.locals.queryResult)
});

// update profile 
router.put('/', (req, res) => {
    db.UserModel.findByIdAndUpdate(req.body.id, {$set: {'profile': req.body.data}}, {new: true})
        .then((updatedUser) => res.json(updatedUser))
        .catch((error) => console.log(error));
});

// find user profile 
router.get('/find/:id', (req, res) => {
    db.UserModel.findById(req.params.id)
        .populate('reviews')
        .then((profile) => res.json(profile))
        .catch((error) => console.log(error));
});

module.exports = router;