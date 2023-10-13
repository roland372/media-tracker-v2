import gql from 'graphql-tag';

export const typeAnime = gql`
	scalar Date

	type Anime {
		episodesMax: Int
		episodesMin: Int
		favourites: Boolean
		_id: String
		imageURL: String
		lastModified: Date
		link: String
		linkName: String
		mal_id: Int
		owner: String
		rating: Int
		status: String
		title: String
		type: String
	}

	input AnimeInput {
		episodesMax: Int
		episodesMin: Int
		favourites: Boolean
		imageURL: String
		lastModified: Date
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
		getAllAnime: [Anime]
		getSingleAnime(ID: ID!): Anime!
	}

	type Mutation {
		addAnime(animeInput: AnimeInput): Anime!
		deleteAnime(ID: ID!): Boolean
		editAnime(ID: ID!, animeInput: AnimeInput): Boolean
	}
`;
