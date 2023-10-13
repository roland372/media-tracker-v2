import Manga from '../../db/models/Manga';
import { TMangaInput, TManga, TContext } from '../../types';

export const mangaResolvers = {
	Query: {
		async getAllManga<T>(_: T, __: T, context: TContext) {
			return await Manga.find({ owner: context.userFromContext[0].email }).sort({ title: "asc" });
		},
		async getSingleManga<T>(_: T, { ID }: TManga) {
			return await Manga.findById(ID);
		},
	},
	Mutation: {
		async addManga<T>(_: T, { mangaInput }: TMangaInput) {
			const newManga = new Manga({
				...mangaInput,
				lastModified: Date.now(),
			});

			await newManga.save();
			return newManga;
		},

		async deleteManga<T>(_: T, { ID }: TMangaInput) {
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
