import gql from 'graphql-tag';

export const typeCharacter = gql`
	scalar Date

	type Character {
		favourites: Boolean
		gender: String
		hairColor: String
		_id: String
		imageURL: String
		lastModified: Date
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
		lastModified: Date
		link: String
		linkName: String
		mal_id: Int
		name: String!
		owner: String!
		series: String
		source: String
	}

	type Query {
		getAllCharacters: [Character]
		getSingleCharacter(ID: ID!): Character!
	}

	type Mutation {
		addCharacter(characterInput: CharacterInput): Character!
		deleteCharacter(ID: ID!): Boolean
		editCharacter(ID: ID!, characterInput: CharacterInput): Boolean
	}
`;
