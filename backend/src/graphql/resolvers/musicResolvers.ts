import Music from '../../db/models/Music';
import { TMusicInput, TMusic, TContext } from '../../types';
import { EQueryParams } from '@common/types';

export const musicResolvers = {
	Query: {
		async getAllMusic<T>(
			_: T,
			{ query }: { query: EQueryParams },
			context: TContext,
		) {

			let baseQuery = Music.find({ owner: context.userFromContext[0].email });

			if (query === EQueryParams.ALL) {
				return await baseQuery.sort({ artist: "asc" });
			}
			if (query === EQueryParams.LIMIT) {
				return await baseQuery.limit(20).sort({ updatedAt: "desc", artist: "asc" });
			}
			if (query === EQueryParams.FAVOURITES) {
				return baseQuery.where({ favourites: true }).sort({ artist: "asc" });
			}
		},

		async getSingleMusic<T>(_: T, { ID }: TMusic) {
			return await Music.findById(ID);
		},

		async getMusicCount<T>(_: T,
			__: T,
			context: TContext,) {
			return await Music.find({ owner: context.userFromContext[0].email }).countDocuments();
		},
	},
	Mutation: {
		async addMusic<T>(_: T, { musicInput }: TMusicInput) {
			const newMusic = new Music({
				...musicInput,
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
