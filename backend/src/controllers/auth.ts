import { Request, Response } from "express";
import passport, { Profile } from "passport";

const authUser = passport.authenticate('google', { scope: ['email', 'profile'] });

const googleCallback = passport.authenticate('google', {
	successRedirect: '/protected',
	failureRedirect: '/login/failure',
});

const authFailure = <T>(_: T, res: Response) => {
	res.send('something went wrong');
};

const protectedRoute = (req: any, res: Response) => {
	const user = req.user as Profile;
	res.send(`Hello ${user.displayName}`);
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

export default { authUser, googleCallback, authFailure, protectedRoute, logout };