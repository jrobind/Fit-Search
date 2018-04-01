const LocalStrategy = require('passport-local').Strategy;
const db = require('../models/');
const bcrypt = require('bcryptjs');