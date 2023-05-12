import { Request, Response } from "express";
import passport, { Profile } from "passport";

const authUser = passport.authenticate('google', { scope: ['email', 'profile'] });

const CLIENT_URL = "http://localhost:8080";

const googleCallback = passport.authenticate('google', {
	successRedirect: CLIENT_URL,
	failureRedirect: '/login/failure',
	scope: ['email', 'profile'],
});

const authFailure = <T>(_: T, res: Response) => {
	res.send('failed to authenticate');
};

const authSuccess = (req: Request, res: Response) => {
	if (req.user) {
		res.status(200).json({
			success: true,
			message: 'SUCCESS',
			user: req.user,
			cookies: req.cookies,
		});
	} else {
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
				res.redirect('http://localhost:5000');
			}
		});
	});
};

export default { authUser, googleCallback, authFailure, authSuccess, protectedRoute, logout };