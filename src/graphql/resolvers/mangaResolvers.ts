import Manga from '../../db/models/Manga';
import { TMangaInput, TManga } from '../../types';
import { v4 as uuidv4 } from 'uuid';

export const mangaResolvers = {
	Query: {
		async getAllManga() {
			return await Manga.find();
		},
		async getSingleManga<T>(_: T, { ID }: TManga) {
			return await Manga.findById(ID);
		},
	},
	Mutation: {
		async addManga<T>(_: T, { mangaInput }: TMangaInput) {
			const newManga = new Manga({
				...mangaInput,
				id: uuidv4(),
				lastModified: Date.now(),
			});

			await newManga.save();
			return newManga;
		},

		async deleteManga<T>(_: T, { ID }: any) {
			const wasDeleted = (await Manga.deleteOne({ _id: ID })).deletedCount;
			return wasDeleted;
		},

		async editManga<T>(_: T, { ID, mangaInput }: TMangaInput) {
			const wasEdited = (
				await Manga.updateOne(
					{ _id: ID },
					{
						...mangaInput,
					}
				)
			).modifiedCount;
			return wasEdited;
		},
	},
};
