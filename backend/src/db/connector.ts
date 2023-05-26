import colors from 'colors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
mongoose.set('strictQuery', false);

export const databaseConnector = async (): Promise<void> => {
	const MONGODB_URI = process.env.NODE_ENV!.trim() === 'development' ? process.env.NODE_MONGODB_URI_DEVELOPMENT : process.env.NODE_MONGODB_URI;

	const MONGO_DB = process.env.NODE_ENV!.trim() === 'development' ? 'development' : 'production'

	return mongoose
		.connect(MONGODB_URI!)
		.then(() => console.log(colors.green.bold(`connector.ts MongoDB - ${MONGO_DB} connected`)))
		.catch(err => console.error(err));
};
