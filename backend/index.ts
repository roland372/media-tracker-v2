import { json } from 'body-parser';
import colors from 'colors';
import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { getEnvVariable } from 'src/utils';
import { ngrokSkipBrowserWarning } from 'src/middlewares/ngrokSkipBrowserWarning';

import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { applyMiddleware } from 'graphql-middleware';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { ApolloServer } from '@apollo/server';
import shield from "./src/utils/permissions";
import { resolvers } from './src/graphql/resolvers';
import { typeDefs } from './src/graphql/typeDefs';

import { databaseConnector } from './src/db/connector';
import User from "./src/db/models/User";

dotenv.config();

console.log(process.env.NODE_ENV && colors.blue.bold(process.env.NODE_ENV));

const PORT = process.env.PORT || 5000;
const CLIENT_URL = getEnvVariable('NODE_CLIENT_URL_DEVELOPMENT', 'NODE_CLIENT_URL');
const SERVER_URL = getEnvVariable('NODE_SERVER_URL_DEVELOPMENT', 'NODE_SERVER_URL');

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

	// Use the custom header middleware before other routes
  app.use(ngrokSkipBrowserWarning);

	app.use(cors({
		origin: [CLIENT_URL!, SERVER_URL!, "http://localhost:8080"],
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
		credentials: true,
	}));
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
