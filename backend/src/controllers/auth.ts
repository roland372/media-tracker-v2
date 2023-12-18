import dotenv from 'dotenv';
import { Request, Response } from "express";
import { CallbackError } from "mongoose";
import User from "../db/models/User";
import passport, { Profile } from "passport";
import { getEnvVariable } from 'src/utils';

dotenv.config();

const authUser = passport.authenticate('google', { scope: ['email', 'profile'] });
const CLIENT_URL = getEnvVariable('NODE_CLIENT_URL_DEVELOPMENT', 'NODE_CLIENT_URL');

const googleCallback = passport.authenticate('google', {
  failureRedirect: '/login/failure',
  scope: ['email', 'profile'],
  successRedirect: CLIENT_URL!,
});

const authFailure = <T>(_: T, res: Response) => {
  res.send('failed to authenticate');
};

const authSuccess = async (req: Request, res: Response) => {
  //? check if user exists in db
  if (req.headers.user) {
    const userFromClient = JSON.parse(req.headers.user as string);
    let user = await User.findOne({ googleId: userFromClient.googleId });

    if (!user) {
      user = new User({
        email: userFromClient.email,
        googleId: userFromClient.googleId,
        profileImg: userFromClient.profileImg,
        username: userFromClient.username,
      });

      user.save((err: CallbackError) => {
        if (err) {
          console.error("user.save() ERROR", err);
          throw err;
        }
      });
    };

    res.header('Access-Control-Allow-Origin', CLIENT_URL);
    res.header('Access-Control-Allow-Credentials', 'true');

    res.status(200).json({
      cookies: req.cookies,
      message: 'SUCCESS',
      sessionID: req.sessionID,
      success: true,
      user: user,
    });

  }
  //? user already exists in db
  else if (req.headers.googleid) {
    const googleId = req.headers.googleid;
    const userFromDB = await User.findOne({ googleId });

    if (!userFromDB) {
      return res.status(401).json({
        message: 'FAILURE',
        success: false,
      });
    }

    res.header('Access-Control-Allow-Origin', CLIENT_URL);
    res.header('Access-Control-Allow-Credentials', 'true');

    res.status(200).json({
      cookies: req.cookies,
      message: 'SUCCESS',
      sessionID: req.sessionID,
      success: true,
      user: userFromDB,
    });
  }
  else {
    res.header('Access-Control-Allow-Origin', CLIENT_URL);
    res.header('Access-Control-Allow-Credentials', 'true');

    res.status(401).json({
      message: 'FAILURE',
      success: false,
    });
  }
};

const protectedRoute = (req: Request, res: Response) => {
  const user = req.user as Profile;
  res.send(`Hello ${user.username}`);
};

const logout = (req: Request, res: Response) => {
  req.logout(function (err) {
    if (err) {
      return err;
    }
    req.session.destroy((err) => {
      if (err) {
        console.log("error", err);
      } else {
        console.log('Session destroyed successfully.');
        // res.redirect(CLIENT_URL_LOGIN);
        res.send("logged out");
      }
    });
  });
};

export default { authUser, googleCallback, authFailure, authSuccess, protectedRoute, logout };
