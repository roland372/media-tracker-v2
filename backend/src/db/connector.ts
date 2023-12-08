import colors from 'colors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { getEnvVariable } from 'src/utils';

dotenv.config();
mongoose.set('strictQuery', false);

export const databaseConnector = async (): Promise<void> => {
	const MONGODB_URI = getEnvVariable('NODE_MONGODB_URI_DEVELOPMENT', 'NODE_MONGODB_URI');

	const MONGO_DB = process.env.NODE_ENV &&
		process.env.NODE_ENV!.trim() === 'development'
		? 'development'
		: 'production';

	return mongoose
		.connect(MONGODB_URI!)
		.then(() => console.log(colors.green.bold(`connector.ts MongoDB - ${MONGO_DB} connected`)))
		.catch(err => console.error(err));
};
