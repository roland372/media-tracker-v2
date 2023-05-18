import express from 'express';
import session from 'express-session';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import colors from 'colors';
import { json } from 'body-parser';
import { expressMiddleware } from '@apollo/server/express4';
import { applyMiddleware } from 'graphql-middleware';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { databaseConnector } from './src/db/connector';
import { typeDefs } from './src/graphql/typeDefs';
import { resolvers } from './src/graphql/resolvers';
import passport from "passport";
import authRoute from '../backend/src/routes/auth';
import User from '../backend/src/db/models/User';
import shield from '../backend/src/utils/permissions';
import MongoStore from 'connect-mongo';

require('../backend/src/config/passportStrategy');

dotenv.config();

console.log(colors.blue.bold(process.env.NODE_ENV!.trim()));

// const PORT = process.env.NODE_ENV!.trim() === 'development' ? process.env.NODE_GRAPHQL_PORT_DEVELOPMENT : process.env.NODE_GRAPHQL_PORT;
const PORT = process.env.PORT || 5000;

const CLIENT_URL = process.env.NODE_ENV!.trim() === 'development' ? process.env.NODE_CLIENT_URL_DEVELOPMENT : process.env.NODE_CLIENT_URL;

const SERVER_URL = process.env.NODE_ENV!.trim() === 'development' ? process.env.NODE_SERVER_URL_DEVELOPMENT : process.env.NODE_SERVER_URL;

const MONGODB_URI = process.env.NODE_ENV!.trim() === 'development' ? process.env.NODE_MONGODB_URI_DEVELOPMENT : process.env.NODE_MONGODB_URI;

const app = express();
const httpServer = http.createServer(app);
const schema = applyMiddleware(makeExecutableSchema({
	typeDefs,
	resolvers,
}),
	shield)
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
		origin: [CLIENT_URL!, SERVER_URL!],
		methods: "GET,POST,PUT,DELETE",
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

	await new Promise<void>((resolve) => httpServer.listen({ port: PORT }, resolve));

	console.log(colors.magenta.bold(`index.ts 🚀 GraphQL Server ready at port : ${PORT}`));

};
startServer();
