import Music from '../../db/models/Music';
import { TMusicInput, TMusic, TContext } from '../../types';

export const musicResolvers = {
	Query: {
		async getAllMusic<T>(_: T, __: T, context: TContext) {
			return await Music.find({ owner: context.userFromContext[0].email }).sort({ artist: "asc" });
		},
		async getSingleMusic<T>(_: T, { ID }: TMusic) {
			return await Music.findById(ID);
		},
	},
	Mutation: {
		async addMusic<T>(_: T, { musicInput }: TMusicInput) {
			const newMusic = new Music({
				...musicInput,
				lastModified: Date.now(),
			});

			await newMusic.save();
			return newMusic;
		},

		async deleteMusic<T>(_: T, { ID }: TMusicInput) {
			const wasDeleted = (await Music.deleteOne({ _id: ID })).deletedCount;
			return wasDeleted;
		},

		async editMusic<T>(_: T, { ID, musicInput }: TMusicInput) {
			const wasEdited = (
				await Music.updateOne(
					{ _id: ID },
					{
						...musicInput,
					}
				)
			).modifiedCount;
			return wasEdited;
		},
	},
};
