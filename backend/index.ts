import { json } from 'body-parser';
import colors from 'colors';
import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import cors from 'cors';
import session from 'express-session';
import passport from "passport";
import authRoute from "./src/routes/auth";
require("./src/config/passportStrategy");

import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { applyMiddleware } from 'graphql-middleware';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { ApolloServer } from '@apollo/server';
import shield from "./src/utils/permissions";
import { resolvers } from './src/graphql/resolvers';
import { typeDefs } from './src/graphql/typeDefs';

import MongoStore from 'connect-mongo';
import { databaseConnector } from './src/db/connector';
import User from "./src/db/models/User";

dotenv.config();

console.log(colors.blue.bold(process.env.NODE_ENV!.trim()));

const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.NODE_ENV!.trim() === 'development' ? process.env.NODE_CLIENT_URL_DEVELOPMENT : process.env.NODE_CLIENT_URL;
const SERVER_URL = process.env.NODE_ENV!.trim() === 'development' ? process.env.NODE_SERVER_URL_DEVELOPMENT : process.env.NODE_SERVER_URL;
const MONGODB_URI = process.env.NODE_ENV!.trim() === 'development' ? process.env.NODE_MONGODB_URI_DEVELOPMENT : process.env.NODE_MONGODB_URI;

const app = express();
const httpServer = http.createServer(app);
const schema = applyMiddleware(makeExecutableSchema({
	typeDefs,
	resolvers,
}), shield);
const server = new ApolloServer({
	schema,
	plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

const startServer = async (): Promise<void> => {
	await databaseConnector();

	await server.start();

	app.use(session({
		name: "qid",
		secret: "mySession",
		resave: false,
		saveUninitialized: false,
		store: MongoStore.create({ mongoUrl: MONGODB_URI! }),
	}));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(cors({
		origin: [CLIENT_URL!, SERVER_URL!, "http://localhost:8080"],
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
		credentials: true,
	}));
	app.use("/", authRoute);
	app.use(
		'/',
		cors<cors.CorsRequest>(),
		json(),
		expressMiddleware(server, {
			context: async ({ req }) => {
				const userFromContext = await User.find({ email: req.headers.userid });
				return { userFromContext };
			}
		}),
	);

	await new Promise<void>((resolve) => httpServer.listen({ port: PORT, host: "0.0.0.0" }, resolve));

	console.log(colors.magenta.bold(`index.ts 🚀 GraphQL Server ready at port : ${PORT}`));

};
startServer();
