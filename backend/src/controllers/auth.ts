import { Request, Response } from "express";
import passport, { Profile } from "passport";
import dotenv from 'dotenv';
import User from "../db/models/User";
import { CallbackError } from "mongoose";

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
			})

			user.save((err: CallbackError) => {
				if (err) {
					console.error("user.save() ERROR", err);
					throw err;
				}
			});
		};

		res.status(200).json({
			success: true,
			message: 'SUCCESS',
			user: user,
			sessionID: req.sessionID,
			cookies: req.cookies,
		});
	}
	//? user already exists in db
	else if (req.headers.googleid) {
		const googleId = req.headers.googleid;
		const userFromDB = await User.findOne({ googleId });

		if (!userFromDB) {
			return res.status(401).json({
				success: false,
				message: 'FAILURE',
			});
		}
		res.status(200).json({
			success: true,
			message: 'SUCCESS',
			user: userFromDB,
			sessionID: req.sessionID,
			cookies: req.cookies,
		});
	}
	else {
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