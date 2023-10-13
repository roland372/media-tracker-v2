import Anime from '../../db/models/Anime';
import { TAnimeInput, TAnime, TContext } from '../../types';

export const animeResolvers = {
	Query: {
		async getAllAnime<T>(_: T, __: T, context: TContext) {
			return await Anime.find({ owner: context.userFromContext[0].email }).sort({ title: "asc" });
		},
		async getSingleAnime<T>(_: T, { ID }: TAnime) {
			return await Anime.findById(ID);
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
