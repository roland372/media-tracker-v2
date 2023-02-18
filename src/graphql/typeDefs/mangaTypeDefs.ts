import gql from 'graphql-tag';

export const typeManga = gql`
	type Manga {
		title: String
		author: String
	}

	type Query {
		getAllManga: [Manga]
	}
`;
