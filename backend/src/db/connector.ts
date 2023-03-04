import mongoose from 'mongoose';
import colors from 'colors';

mongoose.set('strictQuery', false);

export const databaseConnector = async (): Promise<void> => {
	const uri = process.env.NODE_MONGODB_URI!;
	return mongoose
		.connect(uri)
		.then(() => console.log(colors.green.bold('connector.ts db connected')))
		.catch(err => console.error(err));
};
