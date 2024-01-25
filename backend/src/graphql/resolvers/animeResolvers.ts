import Anime from '../../db/models/Anime';
import { TAnimeInput, TAnime, TContext } from '../../types';
import { EQueryParams } from '@common/types';

export const animeResolvers = {
	Query: {
		async getAllAnime<T>(
			_: T,
			{ query }: { query: EQueryParams; },
			context: TContext,
		) {

			let baseQuery = Anime.find({ owner: context.userFromContext[0].email });

			if (query === EQueryParams.ALL) {
				return await baseQuery.sort({ title: "asc" });
			}
			if (query === EQueryParams.LIMIT) {
				return await baseQuery.limit(20).sort({ updatedAt: "desc", title: "asc" });
			}
			if (query === EQueryParams.FAVOURITES) {
				return baseQuery.where({ favourites: true }).sort({ title: "asc" });
			}
		},

		async getSingleAnime<T>(_: T, { ID }: TAnime) {
			return await Anime.findById(ID);
		},

		async getAnimeCount<T>(_: T,
			__: T,
			context: TContext,) {
			return await Anime.find({ owner: context.userFromContext[0].email }).countDocuments();
		},
	},
	Mutation: {
		async addAnime<T>(_: T, { animeInput }: TAnimeInput) {
			const newAnime = new Anime({
				...animeInput,
			});

			await newAnime.save();
			return newAnime;
		},

		async deleteAnime<T>(_: T, { ID }: TAnimeInput) {
			const wasDeleted = (await Anime.deleteOne({ _id: ID })).deletedCount;
			return wasDeleted;
		},

		async editAnime<T>(_: T, { ID, animeInput }: TAnimeInput) {
			const wasEdited = (
				await Anime.updateOne(
					{ _id: ID },
					{
						...animeInput,
					}
				)
			).modifiedCount;
			return wasEdited;
		},
	},
};
