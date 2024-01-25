import Movie from '../../db/models/Movie';
import { TMovieInput, TMovie, TContext } from '../../types';
import { EQueryParams } from '@common/types';

export const movieResolvers = {
	Query: {
		async getAllMovies<T>(
			_: T,
			{ query }: { query: EQueryParams },
			context: TContext,
		) {

			let baseQuery = Movie.find({ owner: context.userFromContext[0].email });

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

		async getSingleMovie<T>(_: T, { ID }: TMovie) {
			return await Movie.findById(ID);
		},

		async getMovieCount<T>(_: T,
			__: T,
			context: TContext,) {
			return await Movie.find({ owner: context.userFromContext[0].email }).countDocuments();
		},
	},
	Mutation: {
		async addMovie<T>(_: T, { movieInput }: TMovieInput) {
			const newMovie = new Movie({
				...movieInput,
			});

			await newMovie.save();
			return newMovie;
		},

		async deleteMovie<T>(_: T, { ID }: TMovieInput) {
			const wasDeleted = (await Movie.deleteOne({ _id: ID })).deletedCount;
			return wasDeleted;
		},

		async editMovie<T>(_: T, { ID, movieInput }: TMovieInput) {
			const wasEdited = (
				await Movie.updateOne(
					{ _id: ID },
					{
						...movieInput,
					}
				)
			).modifiedCount;
			return wasEdited;
		},
	},
};
