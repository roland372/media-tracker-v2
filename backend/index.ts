import express from 'express';
import session from 'express-session';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './src/graphql/typeDefs';
import { resolvers } from './src/graphql/resolvers';
import passport, { Profile } from "passport";

import { databaseConnector } from './src/db/connector';
import colors from 'colors';
import dotenv from 'dotenv';
import { isLoggedIn } from './src/middlewares/isLoggedIn';
require('../backend/src/config/passportStrategy');

dotenv.config();

const PORT = 4000;

const app = express();
app.use(session({
	secret: "mySession",
	resave: false,
	saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (_, res) => {
	res.send('<a href="/auth/google">authenticate</a>')
});

app.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile', 'openid'] }));

app.get('/google/callback', passport.authenticate('google', {
	successRedirect: '/protected',
	failureRedirect: '/auth/failure',
}));

app.get('/auth/failure', (_, res) => {
	res.send('something went wrong');
});

app.get('/protected', isLoggedIn, (req: any, res) => {
	const user = req.user as Profile;
	console.log(req.user.picture);
	res.send(`Hello ${user.displayName}`);
});

app.get('/logout', (req, res) => {
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
});

app.listen({ port: 5000 }, () => {
	console.log(colors.green.bold(`🚀 Node.js Server ready at http://localhost:5000`));
});

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

const startServer = async (): Promise<void> => {
	await databaseConnector();

	await startStandaloneServer(server, {
		listen: { port: PORT },
	});
};

startServer();

console.log(colors.magenta.bold(`index.ts 🚀 GraphQL Server ready at port : ${PORT}`));
