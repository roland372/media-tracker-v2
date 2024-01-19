import User from '../../db/models/User';
import { TUserInput, TUser } from '../../types';

export const userResolvers = {
	Query: {
		async getSingleUser<T>(_: T, { email }: TUser) {
			return await User.findOne({ email });
		},
	},
	Mutation: {
		async editUser<T>(_: T, { email, userInput }: TUserInput) {
			const wasEdited = (
				await User.updateOne(
					{ email },
					{
						...userInput,
					}
				)
			).modifiedCount;
			return wasEdited;
		},
	},
};
