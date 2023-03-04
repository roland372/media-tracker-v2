import gql from 'graphql-tag';

export const typeNote = gql`
	scalar Date

	type Note {
		color: String
		_id: String
		id: String
		lastModified: Date
		note: String
		title: String
	}

	input NoteInput {
		color: String
		note: String
		title: String
	}

	type Query {
		getAllNotes: [Note]
		getSingleNote(ID: ID!): Note!
	}

	type Mutation {
		addNote(noteInput: NoteInput): Note!
		deleteNote(ID: ID!): Boolean
		editNote(ID: ID!, noteInput: NoteInput): Boolean
	}
`;
