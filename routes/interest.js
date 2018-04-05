const express = require('express');
const router = express.Router();
const db = require('../models/');
const middleware = require('../middleware');


// create interest request 
router.post('/', middleware.createInterest, (req, res) => {
    res.json(res.locals.interest);
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
