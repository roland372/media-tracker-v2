import Note from '../../db/models/Note';
import { TNote, TNoteInput, TContext } from '@common/types';
import { v4 as uuidv4 } from 'uuid';

export const noteResolvers = {
	Query: {
		async getAllNotes<T>(_: T, __: T, context: TContext) {
			return await Note.find({ owner: context.userFromContext[0].email }).sort({ lastModified: "desc" });
		},
		async getSingleNote<T>(_: T, { ID }: TNote) {
			return await Note.findById(ID);
		},
	},
	Mutation: {
		async addNote<T>(_: T, { noteInput }: TNoteInput) {
			const newNote = new Note({
				...noteInput,
				id: uuidv4(),
				lastModified: Date.now(),
			});

			await newNote.save();
			return newNote;
		},

		async deleteNote<T>(_: T, { ID }: TNoteInput) {
			const wasDeleted = (await Note.deleteOne({ _id: ID })).deletedCount;
			return wasDeleted;
		},

		async editNote<T>(_: T, { ID, noteInput }: TNoteInput) {
			const wasEdited = (
				await Note.updateOne(
					{ _id: ID },
					{
						...noteInput,
					}
				)
			).modifiedCount;
			return wasEdited;
		},
	},
};
