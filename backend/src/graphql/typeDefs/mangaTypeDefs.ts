import gql from 'graphql-tag';

export const typeManga = gql`
	scalar Date

	type Manga {
		chaptersMax: Int
		chaptersMin: Int
		favourites: Boolean
		_id: String
		imageURL: String
		link: String
		linkName: String
		mal_id: Int
		owner: String
		rating: Int
		status: String
		title: String
		type: String
		volumesMax: Int
		volumesMin: Int
		createdAt: Date
		updatedAt: Date
	}

	input MangaInput {
		chaptersMax: Int
		chaptersMin: Int
		favourites: Boolean
		imageURL: String
		link: String
		linkName: String
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
