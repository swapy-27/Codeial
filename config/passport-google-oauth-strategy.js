const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
const { userInfo } = require('os');

//tell passort to use a new strategy for google login
passport.use(new googleStrategy({
    clientID: 'update client id',
    clientSecret: 'update client secret',
    //if google verifies u it will  call ur server at this route
    callbackURL: 'http://localhost:8000/user/auth/google/callback'
},
    function (acessToken, refreshToken, profile, done) {
        User.findOne({ email: profile.emails[0].value }).exec(function (err, user) {
            if (err) {
                console.log('error in google startegy passport', err);
                return;
            }
            console.log(profile);
            // if user is present then fine log in
            if (user) {
                return done(null, user);
            } else {
                //else create new one
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    //creating random encrypted password
                    password: crypto.randomBytes(20).toString('hex')
                }, function (err, user) {
                    if (err) {
                        console.log('error in google startegy passport creating user', err);
                        return;
                    } else {
                        return done(null, user);
                    }
                })
            }
        })
    }
))