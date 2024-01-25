import gql from 'graphql-tag';

export const typeGame = gql`
	scalar Date

	enum EQueryParams {
		ALL
		LIMIT
		FAVOURITES
		COUNT
	}

	type Game {
		favourites: Boolean
		_id: String
		imageURL: String
		link: String
		linkName: String
		owner: String
    playtime: Int
		rating: Int
		status: String
		title: String
		type: String
		createdAt: Date
		updatedAt: Date
	}

	input GameInput {
		favourites: Boolean
		imageURL: String
		link: String
		linkName: String
		owner: String!
    playtime: Int
		rating: Int
		status: String
		title: String!
		type: String
	}

	type Query {
		getAllGames(query: EQueryParams): [Game]
		getSingleGame(ID: ID!): Game!
		getGameCount: Int
	}

	type Mutation {
		addGame(gameInput: GameInput): Game!
		deleteGame(ID: ID!): Boolean
		editGame(ID: ID!, gameInput: GameInput): Boolean
	}
`;
