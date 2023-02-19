//? <----- Anime ----->
export enum EAnimeStatus {
	WATCHING = 'Watching',
	COMPLETED = 'Completed',
	ON_HOLD = 'On-Hold',
	DROPPED = 'Dropped',
	PLAN_TO_WATCH = 'Plan to Watch',
}

export enum EAnimeType {
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
	status: EAnimeStatus;
	title: string;
	type: EAnimeType;
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
		status: EAnimeStatus;
		title: string;
		type: EAnimeType;
	};
	ID: string;
};

//? <----- Manga ----->
export enum EMangaStatus {
	READING = 'Reading',
	COMPLETED = 'Completed',
	ON_HOLD = 'On-Hold',
	DROPPED = 'Dropped',
	PLAN_TO_READ = 'Plan to Read',
}

export enum EMangaType {
	DOUJINSHI = 'Doujinshi',
	LIGHT_NOVEL = 'Light Novel',
	MANGA = 'Manga',
	MANHUA = 'Manhua',
	NOVEL = 'Novel',
	ONE_SHOT = 'One-shot',
	WEBTOON = 'Webtoon',
}

export type TManga = {
	chaptersMax: number;
	chaptersMin: number;
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
	status: EMangaStatus;
	title: string;
	type: EMangaType;
	volumesMax: number;
	volumesMin: number;
};

export type TMangaInput = {
	mangaInput: {
		chaptersMax: number;
		chaptersMin: number;
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
		status: EMangaStatus;
		title: string;
		type: EMangaType;
		volumesMax: number;
		volumesMin: number;
	};
	ID: string;
};
