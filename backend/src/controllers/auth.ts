import { Request, Response } from "express";
import passport, { Profile } from "passport";
import dotenv from 'dotenv';
import Session from "../db/models/Session";
import User from "../db/models/User";

dotenv.config();

const authUser = passport.authenticate('google', { scope: ['email', 'profile'] });

const CLIENT_URL = process.env.NODE_ENV!.trim() === 'development' ? process.env.NODE_CLIENT_URL_DEVELOPMENT : process.env.NODE_CLIENT_URL

const googleCallback = passport.authenticate('google', {
	successRedirect: CLIENT_URL!,
	failureRedirect: '/login/failure',
	scope: ['email', 'profile'],
});

const authFailure = <T>(_: T, res: Response) => {
	res.send('failed to authenticate');
};

// const authSuccess = async (req: Request, res: Response) => {
// 	const sessionID = req.headers.sessionid;
// 	const googleId = req.headers.googleid;

// 	const sessionFromDB = await Session.findById(sessionID);
// 	const userFromDB = await User.findOne({ googleId });

// 	// console.log("req", req);
// 	console.log("sessionID", sessionID);
// 	console.log("googleId", googleId);
// 	console.log("req.user", req.user);

// 	if (req.user) {
// 		console.log("IF");
// 		res.status(200).json({
// 			success: true,
// 			message: 'SUCCESS',
// 			user: req.user,
// 			sessionID: req.sessionID,
// 			cookies: req.cookies,
// 		});
// 	}
// 	else if (sessionFromDB && userFromDB) {
// 		console.log("ELSE IF");
// 		res.status(200).json({
// 			success: true,
// 			message: 'SUCCESS',
// 			user: userFromDB,
// 			sessionID: sessionFromDB._id,
// 			cookies: req.cookies,
// 		});
// 	}
// 	else {
// 		console.log("ELSE");
// 		res.status(401).json({
// 			success: false,
// 			message: 'FAILURE',
// 		});
// 	}
// }

const authSuccess = async (req: Request, res: Response) => {
	const sessionID = req.headers.sessionid;
	const googleId = req.headers.googleid;

	const sessionFromDB = await Session.findById(sessionID);
	const userFromDB = await User.findOne({ googleId });

	// console.log("req", req);
	console.log("sessionID", sessionID);
	console.log("googleId", googleId);
	console.log("req.user", req.user);

	if (req.user) {
		console.log("authSuccess IF req.user");
		res.status(200).json({
			success: true,
			message: 'SUCCESS',
			user: req.user,
			sessionID: req.sessionID,
			// cookies: req.cookies,
		});
	}
	else if (sessionFromDB && userFromDB) {
		console.log("authSuccess ELSE IF sessionFromDB && userFromDB");
		res.status(200).json({
			success: true,
			message: 'SUCCESS',
			user: userFromDB,
			sessionID: sessionFromDB._id,
			cookies: req.cookies,
		});
	}
	else {
		console.log("authSuccess ELSE");
		res.status(401).json({
			success: false,
			message: 'FAILURE',
		});
	}
}

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