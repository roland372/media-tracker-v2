import gql from 'graphql-tag';

export const typeEmote = gql`
	scalar Date

	type Emote {
		favourites: Boolean
		_id: String
		name: String
		url: String
		createdAt: Date
		updatedAt: Date
	}

	input EmoteInput {
		favourites: Boolean
		name: String!
		url: String!
	}

	type Query {
		getAllEmotes: [Emote]
		getSingleEmote(ID: ID!): Emote!
		getEmoteCount: Int
	}

	type Mutation {
		addEmote(emoteInput: EmoteInput): Emote!
		deleteEmote(ID: ID!): Boolean
		editEmote(ID: ID!, emoteInput: EmoteInput): Boolean
	}
`;
