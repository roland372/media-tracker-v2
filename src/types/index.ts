export enum EStatus {
	WATCHING = 'Watching',
	COMPLETED = 'Completed',
	ON_HOLD = 'On-Hold',
	DROPPED = 'Dropped',
	PLAN_TO_WATCH = 'Plan to Watch',
}

export enum EType {
	MOVIE = 'Movie',
	ONA = 'ONA',
	OVA = 'OVA',
	SPECIAL = 'Special',
	TV_SHOW = 'TV-Show',
}

export type TAnime = {
	episodesMax: number;
	episodesMin: number;
	favourites: boolean;
	id: string;
	ID: string;
	imageURL: string;
	lastModified: number;
	link1: string;
	link1Name: string;
	link2: string;
	link2Name: string;
	mal_id: string;
	owner: string;
	rating: number;
	status: EStatus;
	title: string;
	type: EType;
};

export type TAnimeInput = {
	animeInput: {
		episodesMax: number;
		episodesMin: number;
		favourites: boolean;
		id: string;
		imageURL: string;
		lastModified: number;
		link1: string;
		link1Name: string;
		link2: string;
		link2Name: string;
		mal_id: string;
		owner: string;
		rating: number;
		status: EStatus;
		title: string;
		type: EType;
	};
	ID: string;
};
