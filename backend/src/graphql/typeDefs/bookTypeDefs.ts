import gql from 'graphql-tag';

export const typeBook = gql`
	scalar Date

	type Book {
    author: String
		favourites: Boolean
    genre: String
		_id: String
		imageURL: String
		lastModified: Date
		link1: String
		link1Name: String
		owner: String
    pages: Int
		rating: Int
		status: String
		title: String
	}

	input BookInput {
    author: String!
		favourites: Boolean
    genre: String
		imageURL: String
		lastModified: Date
		link1: String
		link1Name: String
		owner: String!
    pages: Int
		rating: Int
		status: String
		title: String!
	}

	type Query {
		getAllBooks: [Book]
		getSingleBook(ID: ID!): Book!
	}

	type Mutation {
		addBook(bookInput: BookInput): Book!
		deleteBook(ID: ID!): Boolean
		editBook(ID: ID!, bookInput: BookInput): Boolean
	}
`;
