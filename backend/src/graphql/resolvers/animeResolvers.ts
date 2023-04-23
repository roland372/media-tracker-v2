import Anime from '../../db/models/Anime';
import { TAnimeInput, TAnime } from '../../types';
import { v4 as uuidv4 } from 'uuid';

export const animeResolvers = {
	Query: {
		async getAllAnime() {
			return await Anime.find().sort({ title: "asc" });
		},
		async getSingleAnime<T>(_: T, { ID }: TAnime) {
			return await Anime.findById(ID);
		},
	},
	Mutation: {
		async addAnime<T>(_: T, { animeInput }: TAnimeInput) {
			const newAnime = new Anime({
				...animeInput,
				id: uuidv4(),
				lastModified: Date.now(),
			});

			await newAnime.save();
			return newAnime;
		},

		async deleteAnime<T>(_: T, { ID }: any) {
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
