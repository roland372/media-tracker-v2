import gql from 'graphql-tag';

export const typeCharacter = gql`
	scalar Date

	enum EQueryParams {
		ALL
		LIMIT
		FAVOURITES
		COUNT
	}

	type Character {
		favourites: Boolean
		gender: String
		hairColor: String
		_id: String
		imageURL: String
		link: String
		linkName: String
		mal_id: Int
		name: String
		owner: String
		series: String
		source: String
		createdAt: Date
		updatedAt: Date
	}

	input CharacterInput {
		favourites: Boolean
		gender: String
		hairColor: String
		imageURL: String
		link: String
		linkName: String
		mal_id: Int
		name: String!
		owner: String!
		series: String
		source: String
	}

	type Query {
		getAllCharacters(query: EQueryParams): [Character]
		getSingleCharacter(ID: ID!): Character!
		getCharacterCount: Int
	}

	type Mutation {
		addCharacter(characterInput: CharacterInput): Character!
		deleteCharacter(ID: ID!): Boolean
		editCharacter(ID: ID!, characterInput: CharacterInput): Boolean
	}
`;
