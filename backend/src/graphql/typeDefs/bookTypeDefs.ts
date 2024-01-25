import gql from 'graphql-tag';

export const typeBook = gql`
	scalar Date

	enum EQueryParams {
		ALL
		LIMIT
		FAVOURITES
		COUNT
	}

	type Book {
    author: String
		favourites: Boolean
    genre: String
		_id: String
		imageURL: String
		link: String
		linkName: String
		owner: String
    pages: Int
		rating: Int
		status: String
		title: String
		createdAt: Date
		updatedAt: Date
	}

	input BookInput {
    author: String!
		favourites: Boolean
    genre: String
		imageURL: String
		link: String
		linkName: String
		owner: String!
    pages: Int
		rating: Int
		status: String
		title: String!
	}

	type Query {
		getAllBooks(query: EQueryParams): [Book]
		getSingleBook(ID: ID!): Book!
		getBookCount: Int
	}

	type Mutation {
		addBook(bookInput: BookInput): Book!
		deleteBook(ID: ID!): Boolean
		editBook(ID: ID!, bookInput: BookInput): Boolean
	}
`;
