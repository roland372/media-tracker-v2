const manga = [
	{
		title: 'The Awakening',
		author: 'Kate Chopin',
	},
	{
		title: 'City of Glass',
		author: 'Paul Auster',
	},
];

export const mangaResolvers = {
	Query: {
		getAllManga: () => manga,
	},
};
