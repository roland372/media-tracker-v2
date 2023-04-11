import express from 'express';
import session from 'express-session';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './src/graphql/typeDefs';
import { resolvers } from './src/graphql/resolvers';
import passport from "passport";

import { databaseConnector } from './src/db/connector';
import colors from 'colors';
import dotenv from 'dotenv';
import authRoute from '../backend/src/routes/auth';
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

app.use("/", authRoute);

// app.get("/", (_, res) => {
// 	res.send('<a href="/auth/google">authenticate</a>')
// });

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
