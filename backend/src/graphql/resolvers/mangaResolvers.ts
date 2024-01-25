import Manga from '../../db/models/Manga';
import { TMangaInput, TManga, TContext } from '../../types';
import { EQueryParams } from '@common/types';

export const mangaResolvers = {
	Query: {
		async getAllManga<T>(
			_: T,
			{ query }: { query: EQueryParams },
			context: TContext,
		) {

			let baseQuery = Manga.find({ owner: context.userFromContext[0].email });

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

		async getSingleManga<T>(_: T, { ID }: TManga) {
			return await Manga.findById(ID);
		},

		async getMangaCount<T>(_: T,
			__: T,
			context: TContext,) {
			return await Manga.find({ owner: context.userFromContext[0].email }).countDocuments();
		},
	},
	Mutation: {
		async addManga<T>(_: T, { mangaInput }: TMangaInput) {
			const newManga = new Manga({
				...mangaInput,
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
