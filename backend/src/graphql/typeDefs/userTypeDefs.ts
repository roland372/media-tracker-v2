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
		getSingleUser(email: String!): User
	}

	type Mutation {
		editUser(email: String!, userInput: UserInput): Boolean
	}
`;
