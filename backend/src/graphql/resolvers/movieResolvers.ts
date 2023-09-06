import Movie from '../../db/models/Movie';
import { TMovieInput, TMovie, TContext } from '@common/types';
import { v4 as uuidv4 } from 'uuid';

export const movieResolvers = {
	Query: {
		async getAllMovies<T>(_: T, __: T, context: TContext) {
			return await Movie.find({ owner: context.userFromContext[0].email }).sort({ title: "asc" });
		},
		async getSingleMovie<T>(_: T, { ID }: TMovie) {
			return await Movie.findById(ID);
		},
	},
	Mutation: {
		async addMovie<T>(_: T, { movieInput }: TMovieInput) {
			const newMovie = new Movie({
				...movieInput,
				id: uuidv4(),
				lastModified: Date.now(),
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
