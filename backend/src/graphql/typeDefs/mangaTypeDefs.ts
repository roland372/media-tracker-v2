import gql from 'graphql-tag';

export const typeManga = gql`
	scalar Date

	type Manga {
		chaptersMax: Int
		chaptersMin: Int
		favourites: Boolean
		_id: String
		id: String
		imageURL: String
		lastModified: Date
		link1: String
		link1Name: String
		link2: String
		link2Name: String
		mal_id: Int
		owner: String
		rating: Int
		status: String
		title: String
		type: String
		volumesMax: Int
		volumesMin: Int
	}

	input MangaInput {
		chaptersMax: Int
		chaptersMin: Int
		favourites: Boolean
		imageURL: String
		lastModified: Date
		link1: String
		link1Name: String
		link2: String
		link2Name: String
		mal_id: Int
		owner: String!
		rating: Int
		status: String
		title: String!
		type: String
		volumesMax: Int
		volumesMin: Int
	}

	type Query {
		getAllManga: [Manga]
		getSingleManga(ID: ID!): Manga!
	}

	type Mutation {
		addManga(mangaInput: MangaInput): Manga!
		deleteManga(ID: ID!): Boolean
		editManga(ID: ID!, mangaInput: MangaInput): Boolean
	}
`;
