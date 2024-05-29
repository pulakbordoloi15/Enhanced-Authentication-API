import passport from 'passport';
import dotenv from "dotenv";
dotenv.config();

import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/user.js'
import bcrypt from 'bcryptjs'

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/callback"
},
function(token, tokenSecret, profile, done) {
    // Your user verification logic here
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
    return done(err, user);
    });
}
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

export default passport;