import gql from 'graphql-tag';

export const typeEmote = gql`
	scalar Date

	type Emote {
		favourites: Boolean
		_id: String
		id: String
		lastModified: Date
		name: String
		url: String
	}

	input EmoteInput {
		favourites: Boolean
		lastModified: Date
		name: String
		url: String
	}

	type Query {
		getAllEmotes: [Emote]
		getSingleEmote(ID: ID!): Emote!
	}

	type Mutation {
		addEmote(emoteInput: EmoteInput): Emote!
		deleteEmote(ID: ID!): Boolean
		editEmote(ID: ID!, emoteInput: EmoteInput): Boolean
	}
`;
