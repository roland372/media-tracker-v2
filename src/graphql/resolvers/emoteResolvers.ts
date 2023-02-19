import Emote from '../../db/models/Emote';
import { TEmoteInput, TEmote } from '../../types';
import { v4 as uuidv4 } from 'uuid';

export const emoteResolvers = {
	Query: {
		async getAllEmotes() {
			return await Emote.find();
		},
		async getSingleEmote<T>(_: T, { ID }: TEmote) {
			return await Emote.findById(ID);
		},
	},
	Mutation: {
		async addEmote<T>(_: T, { emoteInput }: TEmoteInput) {
			const newEmote = new Emote({
				...emoteInput,
				id: uuidv4(),
				lastModified: Date.now(),
			});

			await newEmote.save();
			return newEmote;
		},

		async deleteEmote<T>(_: T, { ID }: any) {
			const wasDeleted = (await Emote.deleteOne({ _id: ID })).deletedCount;
			return wasDeleted;
		},

		async editEmote<T>(_: T, { ID, emoteInput }: TEmoteInput) {
			const wasEdited = (
				await Emote.updateOne(
					{ _id: ID },
					{
						...emoteInput,
					}
				)
			).modifiedCount;
			return wasEdited;
		},
	},
};
