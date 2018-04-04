const express = require('express');
const router = express.Router();
const db = require('../models/');
const middleware = require('../middleware');

// create review 
router.post('/', middleware.createReview, (req, res) => {
    res.json(res.locals.review);
});


module.exports = router;