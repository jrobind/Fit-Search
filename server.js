const express = require('express');
const path = require('path');
const app = express();
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('./webpack.config.js');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');

app.use(express.static(path.join(__dirname, 'client')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(webpackMiddleware(webpack(webpackConfig)));

app.use(session({
    secret: 'fit-search super secret',
    resave: false,
    saveUninitialized: false
}));

// config for passport
require('./config/passport')(passport);
// passport middleware
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

//routes

// catch-all route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/index.html'));
});

app.listen(process.env.PORT || 3000, () => console.log('server has started'));
