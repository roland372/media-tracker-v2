import gql from 'graphql-tag';

export const typeCharacter = gql`
	scalar Date

	type Character {
		favourites: Boolean
		gender: String
		hairColor: String
		_id: String
		id: String
		imageURL: String
		lastModified: Date
		link1: String
		link1Name: String
		link2: String
		link2Name: String
		mal_id: String
		name: String
		owner: String
		series: String
		source: String
	}

	input CharacterInput {
		favourites: Boolean
		gender: String
		hairColor: String
		imageURL: String
		lastModified: Date
		link1: String
		link1Name: String
		link2: String
		link2Name: String
		name: String!
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
