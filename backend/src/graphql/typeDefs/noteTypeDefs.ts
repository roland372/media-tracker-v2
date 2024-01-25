import gql from 'graphql-tag';

export const typeNote = gql`
	scalar Date

	type Note {
		color: String
		_id: String
		note: String
		owner: String
		title: String
		createdAt: Date
		updatedAt: Date
	}

	input NoteInput {
		color: String
		note: String
		owner: String!
		title: String!
	}

	type Query {
		getAllNotes: [Note]
		getSingleNote(ID: ID!): Note!
		getNoteCount: Int
	}

	type Mutation {
		addNote(noteInput: NoteInput): Note!
		deleteNote(ID: ID!): Boolean
		editNote(ID: ID!, noteInput: NoteInput): Boolean
	}
`;
