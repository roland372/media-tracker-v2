import gql from 'graphql-tag';

export const typeAnime = gql`
	scalar Date

	enum EQueryParams {
		ALL
		LIMIT
		FAVOURITES
		COUNT
	}

	type Anime {
		episodesMax: Int
		episodesMin: Int
		favourites: Boolean
		_id: String
		imageURL: String
		link: String
		linkName: String
		mal_id: Int
		owner: String
		rating: Int
		status: String
		title: String
		type: String
		createdAt: Date
		updatedAt: Date
	}

	input AnimeInput {
		episodesMax: Int
		episodesMin: Int
		favourites: Boolean
		imageURL: String
		link: String
		linkName: String
		mal_id: Int
		owner: String!
		rating: Int
		status: String
		title: String!
		type: String
	}

	type Query {
		getAllAnime(query: EQueryParams): [Anime]
		getSingleAnime(ID: ID!): Anime!
		getAnimeCount: Int
	}

	type Mutation {
		addAnime(animeInput: AnimeInput): Anime!
		deleteAnime(ID: ID!): Boolean
		editAnime(ID: ID!, animeInput: AnimeInput): Boolean
	}
`;
