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
		imageURL: string;
		link1: string;
		link1Name: string;
		link2: string;
		link2Name: string;
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
		imageURL: string;
		link1: string;
		link1Name: string;
		link2: string;
		link2Name: string;
		rating: number;
		status: EMangaStatus;
		title: string;
		type: EMangaType;
		volumesMax: number;
		volumesMin: number;
	};
	ID: string;
};

//? <----- Games ----->
export enum EGameStatus {
	PLAYING = 'Playing',
	COMPLETED = 'Completed',
	ON_HOLD = 'On-Hold',
	DROPPED = 'Dropped',
	PLAN_TO_PLAY = 'Plan to Play',
}

export enum EGameType {
	GAME = 'Game',
	VISUAL_NOVEL = 'Visual Novel',
}

export type TGame = {
	favourites: boolean;
	id: string;
	ID: string;
	imageURL: string;
	lastModified: number;
	link1: string;
	link1Name: string;
	link2: string;
	link2Name: string;
	owner: string;
	playtime: number;
	rating: number;
	status: EGameStatus;
	title: string;
	type: EGameType;
};

export type TGameInput = {
	gameInput: {
		favourites: boolean;
		imageURL: string;
		link1: string;
		link1Name: string;
		link2: string;
		link2Name: string;
		playtime: number;
		rating: number;
		status: EGameStatus;
		title: string;
		type: EGameType;
	};
	ID: string;
};

//? <----- Characters ----->
export enum ECharacterSource {
	ANIME = 'Anime',
	GAME = 'Game',
	MANGA = 'Manga',
}

export enum ECharacterGender {
	FEMALE = 'Female',
	MALE = 'Male',
	OTHER = 'Other',
}

export type TCharacter = {
	favourites: boolean;
	gender: ECharacterGender;
	hairColor: string;
	id: string;
	ID: string;
	imageURL: string;
	lastModified: number;
	link1: string;
	link1Name: string;
	link2: string;
	link2Name: string;
	mal_id: string;
	name: string;
	owner: string;
	series: string;
	source: ECharacterSource;
};

export type TCharacterInput = {
	characterInput: {
		favourites: boolean;
		gender: ECharacterGender;
		hairColor: string;
		imageURL: string;
		link1: string;
		link1Name: string;
		link2: string;
		link2Name: string;
		name: string;
		series: string;
		source: ECharacterSource;
	};
	ID: string;
};
