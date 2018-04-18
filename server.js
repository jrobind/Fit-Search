const express = require('express');
const path = require('path');
const app = express();
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();

// require routes
const profileRoutes = require('./routes/profile');
const authRoutes = require('./routes/auth');
const reviewRoutes = require('./routes/review');
const interestRoutes  = require('./routes/interest');

app.use(express.static(path.join(__dirname, 'client')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

// config for passport
require('./config/passport')(passport);
// passport middleware
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// routes
app.use('/api/profile', profileRoutes);
app.use('/api', authRoutes);
app.use('/api/review', reviewRoutes);
app.use('/api/interest', interestRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/index.html'));
});

app.listen(process.env.PORT || 3000, () => console.log('server has started'));
