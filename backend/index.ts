import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './src/graphql/typeDefs';
import { resolvers } from './src/graphql/resolvers';

import { databaseConnector } from './src/db/connector';
import colors from 'colors';
import dotenv from 'dotenv';

dotenv.config();

const PORT = 4000;

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

console.log(colors.magenta.bold(`index.ts 🚀 Server ready at port : ${PORT}`));
