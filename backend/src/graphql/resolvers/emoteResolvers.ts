import Emote from '../../db/models/Emote';
import { TEmoteInput, TEmote } from '../../types';

export const emoteResolvers = {
	Query: {
		async getAllEmotes() {
			return await Emote.find().sort({ name: "asc" });
		},
		async getSingleEmote<T>(_: T, { ID }: TEmote) {
			return await Emote.findById(ID);
		},
	},
	Mutation: {
		async addEmote<T>(_: T, { emoteInput }: TEmoteInput) {
			const newEmote = new Emote({
				...emoteInput,
				lastModified: Date.now(),
			});

			await newEmote.save();
			return newEmote;
		},

		async deleteEmote<T>(_: T, { ID }: TEmoteInput) {
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
