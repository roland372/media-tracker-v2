import gql from 'graphql-tag';

export const typeMusic = gql`
	scalar Date

	type Music {
		artist: String
    category: String
		favourites: Boolean
		_id: String
		id: String
		imageURL: String
		lastModified: Date
		link: String
		owner: String
		title: String
	}

	input MusicInput {
    artist: String!
    category: String!
		favourites: Boolean
		imageURL: String
		lastModified: Date
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
