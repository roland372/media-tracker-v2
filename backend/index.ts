import { json } from 'body-parser';
import colors from 'colors';
import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import cors from 'cors';
import session from 'express-session';
import passport from "passport";
import authRoute from "./src/routes/auth";
import { getEnvVariable } from 'src/utils';
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

console.log(process.env.NODE_ENV && colors.blue.bold(process.env.NODE_ENV));

const PORT = process.env.PORT || 5000;
const CLIENT_URL = getEnvVariable('NODE_CLIENT_URL_DEVELOPMENT', 'NODE_CLIENT_URL');
const SERVER_URL = getEnvVariable('NODE_SERVER_URL_DEVELOPMENT', 'NODE_SERVER_URL');
const MONGODB_URI = getEnvVariable('NODE_MONGODB_URI_DEVELOPMENT', 'NODE_MONGODB_URI');

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
