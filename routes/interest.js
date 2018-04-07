const express = require('express');
const router = express.Router();
const db = require('../models/');

// create interest request 
router.post('/', (req, res) => {
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
                .then((interest) => res.json(interest))
                .catch((error) => console.log(error));
        });
});

// delete interest request
router.delete('/:id', (req, res) => {
    db.InterestModel.findByIdAndRemove(req.params.id)
        .then((request) => res.json(request))
        .catch((error) => console.log(error));
});

// get interest requests
router.get('/:id', (req, res) => {
    db.InterestModel.find({'trainerId': req.params.id })
        .populate('requestee')
        .then((requests) => res.json(requests))
        .catch((error) => console.log(error));
});

module.exports = router;