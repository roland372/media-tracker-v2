import gql from 'graphql-tag';

export const typeMusic = gql`
	scalar Date

	type Music {
		artist: String
    category: String
		favourites: Boolean
		_id: String
		imageURL: String
		link: String
		owner: String
		title: String
		createdAt: Date
		updatedAt: Date
	}

	input MusicInput {
    artist: String!
    category: String!
		favourites: Boolean
		imageURL: String
		link: String
		owner: String!
		title: String!
	}

	type Query {
		getAllMusic: [Music]
		getSingleMusic(ID: ID!): Music!
	}

	type Mutation {
		addMusic(musicInput: MusicInput): Music!
		deleteMusic(ID: ID!): Boolean
		editMusic(ID: ID!, musicInput: MusicInput): Boolean
	}
`;
