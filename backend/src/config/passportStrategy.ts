import dotenv from 'dotenv';
import passport from "passport";
const GoogleStrategy = require('passport-google-oauth2').Strategy;
import { Profile, DoneCallback } from 'passport';
import User from '../db/models/User';
import { CallbackError, Document } from 'mongoose';
import { Request } from 'express';

dotenv.config();

const GOOGLE_CALLBACK_URL = process.env.NODE_ENV!.trim() === 'development' ? process.env.NODE_GOOGLE_CALLBACK_URL_DEVELOPMENT : process.env.NODE_GOOGLE_CALLBACK_URL;

// const GOOGLE_CALLBACK_URL = process.env.NODE_ENV!.trim() === 'development' ? process.env.NODE_GOOGLE_CALLBACK_URL_DEVELOPMENT : process.env.NODE_GOOGLE_CALLBACK_URL_DEVELOPMENT;

passport.use(new GoogleStrategy({
  clientID: process.env.NODE_GOOGLE_CLIENT_ID,
  clientSecret: process.env.NODE_GOOGLE_CLIENT_SECRET,
  callbackURL: GOOGLE_CALLBACK_URL,
  passReqToCallback: true
},
  function <T>(req: Request, __: T, ___: T, profile: Profile, done: DoneCallback) {
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
          console.log("if passportStrategy");
          req.user = user;
          return done(err, user);
        });
      } else {
        req.user = user;
        console.log("USER", user);
        console.log("else passportStrategy");
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
