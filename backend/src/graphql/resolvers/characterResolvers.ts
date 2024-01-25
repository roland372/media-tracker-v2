import Character from '../../db/models/Character';
import { TCharacterInput, TCharacter, TContext } from '../../types';
import { EQueryParams } from '@common/types';

export const characterResolvers = {
	Query: {
		async getAllCharacters<T>(
			_: T,
			{ query }: { query: EQueryParams },
			context: TContext,
		) {

			let baseQuery = Character.find({ owner: context.userFromContext[0].email });

			if (query === EQueryParams.ALL) {
				return await baseQuery.sort({ name: "asc" });
			}
			if (query === EQueryParams.LIMIT) {
				return await baseQuery.limit(20).sort({ updatedAt: "desc", title: "asc" });
			}
			if (query === EQueryParams.FAVOURITES) {
				return baseQuery.where({ favourites: true }).sort({ name: "asc" });
			}
		},

		async getSingleCharacter<T>(_: T, { ID }: TCharacter) {
			return await Character.findById(ID);
		},

		async getCharacterCount<T>(_: T,
			__: T,
			context: TContext,) {
			return await Character.find({ owner: context.userFromContext[0].email }).countDocuments();
		},
	},
	Mutation: {
		async addCharacter<T>(_: T, { characterInput }: TCharacterInput) {
			const newCharacter = new Character({
				...characterInput,
			});

			await newCharacter.save();
			return newCharacter;
		},

		async deleteCharacter<T>(_: T, { ID }: TCharacterInput) {
			const wasDeleted = (await Character.deleteOne({ _id: ID })).deletedCount;
			return wasDeleted;
		},

		async editCharacter<T>(_: T, { ID, characterInput }: TCharacterInput) {
			const wasEdited = (
				await Character.updateOne(
					{ _id: ID },
					{
						...characterInput,
					}
				)
			).modifiedCount;
			return wasEdited;
		},
	},
};
