const LocalStrategy = require('passport-local').Strategy;
const db = require('../models/');
const bcrypt = require('bcryptjs');

const config = (passport) => {
    //local strategy
    passport.serializeUser((id, done) => {
        db.UserModel.findById(id, (error, user) => {
            done(error, user); 
        });
    });
    
    passport.use(new LocalStrategy({
        usernameField: 'email', 
        passwordField: 'password',
        passReqToCallback: true
    }, (req, email, password, done) => {
        //match username
        const query = {email: email};
        db.UserModel.findOne(query, (error, user) => {
            if (error) {
                console.log(error);
            }
            if (!user) {
                return done(null, false, {message: 'No user found'});
            }
            // match password
            bcrypt.compare(password, user.password, (error, isMatch) => {
                if (error) {
                    console.log(error);
                }
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, {message: 'Wrong password'});
                }
            });
        });
    }));
};

module.exports = config; 