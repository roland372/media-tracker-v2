import gql from 'graphql-tag';

export const typeMovie = gql`
	scalar Date

	type Movie {
		episodesMax: Int
		episodesMin: Int
		favourites: Boolean
		_id: String
		imageURL: String
		link: String
		linkName: String
		owner: String
		rating: Int
    seasonsMax: Int
		seasonsMin: Int
		status: String
		title: String
		type: String
		createdAt: Date
		updatedAt: Date
	}

	input MovieInput {
		episodesMax: Int
		episodesMin: Int
		favourites: Boolean
		imageURL: String
		link: String
		linkName: String
		owner: String!
		rating: Int
    seasonsMax: Int
		seasonsMin: Int
		status: String
		title: String!
		type: String
	}

	type Query {
		getAllMovies: [Movie]
		getSingleMovie(ID: ID!): Movie!
	}

	type Mutation {
		addMovie(movieInput: MovieInput): Movie!
		deleteMovie(ID: ID!): Boolean
		editMovie(ID: ID!, movieInput: MovieInput): Boolean
	}
`;
