import User from '../../db/models/User';
import { TUserInput, TUser } from '../../types';

export const userResolvers = {
	Query: {
		async getSingleUser<T>(_: T, { ID }: TUser) {
			return await User.findById(ID);
		},
	},
	Mutation: {
		async editUser<T>(_: T, { ID, userInput }: TUserInput) {
			const wasEdited = (
				await User.updateOne(
					{ _id: ID },
					{
						...userInput,
					}
				)
			).modifiedCount;
			return wasEdited;
		},
	},
};
