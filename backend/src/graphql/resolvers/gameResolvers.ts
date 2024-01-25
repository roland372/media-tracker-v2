import Game from '../../db/models/Game';
import { TGameInput, TGame, TContext } from '../../types';
import { EQueryParams } from '@common/types';

export const gameResolvers = {
	Query: {
		async getAllGames<T>(
			_: T,
			{ query }: { query: EQueryParams },
			context: TContext,
		) {

			let baseQuery = Game.find({ owner: context.userFromContext[0].email });

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

		async getSingleGame<T>(_: T, { ID }: TGame) {
			return await Game.findById(ID);
		},

		async getGameCount<T>(_: T,
			__: T,
			context: TContext,) {
			return await Game.find({ owner: context.userFromContext[0].email }).countDocuments();
		},
	},
	Mutation: {
		async addGame<T>(_: T, { gameInput }: TGameInput) {
			const newGame = new Game({
				...gameInput,
			});

			await newGame.save();
			return newGame;
		},

		async deleteGame<T>(_: T, { ID }: TGameInput) {
			const wasDeleted = (await Game.deleteOne({ _id: ID })).deletedCount;
			return wasDeleted;
		},

		async editGame<T>(_: T, { ID, gameInput }: TGameInput) {
			const wasEdited = (
				await Game.updateOne(
					{ _id: ID },
					{
						...gameInput,
					}
				)
			).modifiedCount;
			return wasEdited;
		},
	},
};
