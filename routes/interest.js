const express = require('express');
const router = express.Router();
const db = require('../models/');
const middleware = require('../middleware');


// create interest request 
router.post('/', middleware.createInterest, (req, res) => {
    res.json(res.locals.interest);
});

// get interest requests
router.get('/:id', (req, res) => {
    db.InterestModel.find({'trainerId': req.params.id })
        .populate('requestee')
        .exec((error, requests) => res.json(requests));
});

module.exports = router;
