import Game from '../../db/models/Game';
import { TGameInput, TGame, TContext } from '../../types';
import { v4 as uuidv4 } from 'uuid';

export const gameResolvers = {
	Query: {
		async getAllGames<T>(_: T, __: T, context: TContext) {
			return await Game.find({ owner: context.userFromContext[0].email }).sort({ title: "asc" });
		},
		async getSingleGame<T>(_: T, { ID }: TGame) {
			return await Game.findById(ID);
		},
	},
	Mutation: {
		async addGame<T>(_: T, { gameInput }: TGameInput) {
			const newGame = new Game({
				...gameInput,
				id: uuidv4(),
				lastModified: Date.now(),
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
