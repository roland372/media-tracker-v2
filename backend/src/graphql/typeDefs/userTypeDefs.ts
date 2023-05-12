import gql from 'graphql-tag';

export const typeUser = gql`
	type User {
		_id: String
		color: String
		email: String
		profileDesc: String
		profileImg: String
		role: String
		username: String
	}

	input UserInput {
		color: String!
		profileDesc: String
		profileImg: String!
		username: String!
	}

	type Query {
		getSingleUser(ID: ID!): User!
	}

	type Mutation {
		editUser(ID: ID!, userInput: UserInput): Boolean
	}
`;
