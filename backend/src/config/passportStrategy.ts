import dotenv from 'dotenv';
import passport from "passport";
const GoogleStrategy = require('passport-google-oauth2').Strategy;
import { Profile, DoneCallback } from 'passport';

dotenv.config();

passport.use(new GoogleStrategy({
  clientID: process.env.NODE_GOOGLE_CLIENT_ID,
  clientSecret: process.env.NODE_GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.NODE_CALLBACK_URL,
  passReqToCallback: true
},
  // function(request, accessToken, refreshToken, profile, done) {
  //   User.findOrCreate({ googleId: profile.id }, function (err, user) {
  //     return done(err, user);
  //   });
  // }
  function<T>(_: T, __: T, ___: T, profile: Profile, done: DoneCallback) {
    return done(null, profile);
  }
));

passport.serializeUser(function (user: Express.User, done: DoneCallback) {
  done(null, user);
});

passport.deserializeUser(function (user: Express.User, done: DoneCallback) {
  done(null, user);
});
