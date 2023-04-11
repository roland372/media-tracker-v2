import dotenv from 'dotenv';
import passport from "passport";
const GoogleStrategy = require('passport-google-oauth2').Strategy;
import { Profile, DoneCallback } from 'passport';
import User from '../db/models/User';
import { CallbackError, Document } from 'mongoose';

dotenv.config();

passport.use(new GoogleStrategy({
  clientID: process.env.NODE_GOOGLE_CLIENT_ID,
  clientSecret: process.env.NODE_GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.NODE_CALLBACK_URL,
  passReqToCallback: true
},
  function <T>(_: T, __: T, ___: T, profile: Profile, done: DoneCallback) {
    User.findOne({ googleId: profile.id }, function (err: CallbackError, user: Document) {
      if (err) {
        console.log("User.findOne() ERROR", err);
        return done(err);
      }

      if (!user) {
        user = new User({
          email: profile.emails?.[0].value,
          googleId: profile.id,
          profileImg: profile.photos?.[0].value,
          username: profile.displayName
        });

        user.save((err: CallbackError) => {
          if (err) {
            console.log("user.save() ERROR", err);
          }
          return done(err, user);
        });
      } else {
        return done(err, user);
      }
    });
  },
));

passport.serializeUser(function (user: Express.User, done: DoneCallback) {
  done(null, user);
});

passport.deserializeUser(function (user: Express.User, done: DoneCallback) {
  done(null, user);
});
