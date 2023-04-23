import Character from '../../db/models/Character';
import { TCharacterInput, TCharacter } from '../../types';
import { v4 as uuidv4 } from 'uuid';

export const characterResolvers = {
	Query: {
		async getAllCharacters() {
			return await Character.find().sort({ name: "asc" });
		},
		async getSingleCharacter<T>(_: T, { ID }: TCharacter) {
			return await Character.findById(ID);
		},
	},
	Mutation: {
		async addCharacter<T>(_: T, { characterInput }: TCharacterInput) {
			const newCharacter = new Character({
				...characterInput,
				id: uuidv4(),
				lastModified: Date.now(),
			});

			await newCharacter.save();
			return newCharacter;
		},

		async deleteCharacter<T>(_: T, { ID }: any) {
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
