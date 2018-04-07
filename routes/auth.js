const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const db = require('../models/');
const middleware = require('../middleware');

// login 
router.post('/login', passport.authenticate('local'), (req, res) => {
    db.UserModel.findById(req.user._id)
        .populate('reviews')
        .then((user) => res.json({message:"Success", userType: user.userType, id: user._id}))
        .catch((error) => console.log(error));
});

// logout
router.get('/logout', (req, res) => {
    req.logout();
    res.json({message: 'logged out'});
});


// sign up
router.post('/register', middleware.checkForDuplicateEmail, (req, res) => {
    const newUser = new db.UserModel({
        email: req.body.email,
        password: req.body.password,
        userType: req.body.checked
    });
    
    bcrypt.genSalt(10, (error, salt) => {
        bcrypt.hash(newUser.password, salt, (error, hash) => {
            if (error) {
                console.log(error); 
            }      
            newUser.password = hash;
            
            newUser.save()
                .then((newUser) => res.json(newUser))
                .catch((error) => console.log(error))
        });
    });
});

module.exports = router;