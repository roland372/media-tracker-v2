import Book from '../../db/models/Book';
import { TBookInput, TBook, TContext } from '../../types';
import { EQueryParams } from '@common/types';

export const bookResolvers = {
  Query: {
    async getAllBooks<T>(
			_: T,
			{ query }: { query: EQueryParams },
			context: TContext,
		) {

			let baseQuery = Book.find({ owner: context.userFromContext[0].email });

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

    async getSingleBook<T>(_: T, { ID }: TBook) {
      return await Book.findById(ID);
    },

    async getBookCount<T>(_: T,
			__: T,
			context: TContext,) {
			return await Book.find({ owner: context.userFromContext[0].email }).countDocuments();
		},
  },
  Mutation: {
    async addBook<T>(_: T, { bookInput }: TBookInput) {
      const newBook = new Book({
        ...bookInput,
      });

      await newBook.save();
      return newBook;
    },

    async deleteBook<T>(_: T, { ID }: TBookInput) {
      const wasDeleted = (await Book.deleteOne({ _id: ID })).deletedCount;
      return wasDeleted;
    },

    async editBook<T>(_: T, { ID, bookInput }: TBookInput) {
      const wasEdited = (
        await Book.updateOne(
          { _id: ID },
          {
            ...bookInput,
          }
        )
      ).modifiedCount;
      return wasEdited;
    },
  },
};
