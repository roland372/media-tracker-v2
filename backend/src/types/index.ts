//? <----- UTILS ----->
export type TContext = {
	userFromContext: TUser[];
};

//? <----- ANIME ----->
export enum EAnimeStatus {
	WATCHING = 'Watching',
	COMPLETED = 'Completed',
	ON_HOLD = 'On-Hold',
	DROPPED = 'Dropped',
	PLAN_TO_WATCH = 'Plan to Watch',
};

export enum EAnimeType {
	MOVIE = 'Movie',
	ONA = 'ONA',
	OVA = 'OVA',
	SPECIAL = 'Special',
	TV_SHOW = 'TV-Show',
};

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
	mal_id: number;
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
		lastModified: number;
		link1: string;
		link1Name: string;
		link2: string;
		link2Name: string;
		mal_id?: number;
		rating: number;
		status: EAnimeStatus;
		title: string;
		type: EAnimeType;
	};
	ID: string;
};

//? <----- BOOKS ----->
export enum EBookStatus {
	READING = 'Reading',
	COMPLETED = 'Completed',
	ON_HOLD = 'On-Hold',
	DROPPED = 'Dropped',
	PLAN_TO_READ = 'Plan to Read',
};

export type TBook = {
	author: string;
	favourites: boolean;
	genre: string;
	id: string;
	ID: string;
	imageURL: string;
	lastModified: number;
	link1: string;
	link1Name: string;
	link2: string;
	link2Name: string;
	owner: string;
	pages: number;
	rating: number;
	status: EBookStatus;
	title: string;
};

export type TBookInput = {
	bookInput: {
		author: string;
		favourites: boolean;
		genre: string;
		imageURL: string;
		lastModified: number;
		link1: string;
		link1Name: string;
		link2: string;
		link2Name: string;
		pages: number;
		rating: number;
		status: EBookStatus;
		title: string;
	};
	ID: string;
};

//? <----- CHARACTERS ----->
export enum ECharacterSource {
	ANIME = 'Anime',
	GAME = 'Game',
	MANGA = 'Manga',
};

export enum ECharacterGender {
	FEMALE = 'Female',
	MALE = 'Male',
	OTHER = 'Other',
};

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
	mal_id: number;
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
		lastModified: number;
		link1: string;
		link1Name: string;
		mal_id?: number;
		name: string;
		series: string;
		source: ECharacterSource;
	};
	ID: string;
};

//? <----- EMOTES ----->
export type TEmote = {
	favourites: boolean;
	id: string;
	ID: string;
	lastModified: number;
	name: string;
	url: string;
};

export type TEmoteInput = {
	emoteInput: {
		favourites: boolean;
		name: string;
		lastModified: number;
		url: string;
	};
	ID: string;
};

//? <----- GAMES ----->
export enum EGameStatus {
	PLAYING = 'Playing',
	COMPLETED = 'Completed',
	ON_HOLD = 'On-Hold',
	DROPPED = 'Dropped',
	PLAN_TO_PLAY = 'Plan to Play',
};

export enum EGameType {
	GAME = 'Game',
	VISUAL_NOVEL = 'Visual Novel',
};

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
		lastModified: number;
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

//? <----- MANGA ----->
export enum EMangaStatus {
	READING = 'Reading',
	COMPLETED = 'Completed',
	ON_HOLD = 'On-Hold',
	DROPPED = 'Dropped',
	PLAN_TO_READ = 'Plan to Read',
};

export enum EMangaType {
	DOUJINSHI = 'Doujinshi',
	LIGHT_NOVEL = 'Light Novel',
	MANGA = 'Manga',
	MANHUA = 'Manhua',
	NOVEL = 'Novel',
	ONE_SHOT = 'One-shot',
	WEBTOON = 'Webtoon',
};

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
	mal_id: number;
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
		lastModified: number;
		link1: string;
		link1Name: string;
		link2: string;
		link2Name: string;
		mal_id?: number;
		rating: number;
		status: EMangaStatus;
		title: string;
		type: EMangaType;
		volumesMax: number;
		volumesMin: number;
	};
	ID: string;
};

//? <----- MOVIES ----->
export enum EMovieStatus {
	WATCHING = 'Watching',
	COMPLETED = 'Completed',
	ON_HOLD = 'On-Hold',
	DROPPED = 'Dropped',
	PLAN_TO_WATCH = 'Plan to Watch',
};

export enum EMovieType {
	MOVIE = 'Movie',
	TV_SHOW = 'TV-Show',
};

export type TMovie = {
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
	owner: string;
	rating: number;
	seasonsMax: number;
	seasonsMin: number;
	status: EMovieStatus;
	title: string;
	type: EMovieType
};

export type TMovieInput = {
	movieInput: {
		episodesMax: number;
		episodesMin: number;
		favourites: boolean;
		imageURL: string;
		lastModified: number;
		link1: string;
		link1Name: string;
		link2: string;
		link2Name: string;
		rating: number;
		seasonsMax: number;
		seasonsMin: number;
		status: EMovieStatus;
		title: string;
		type: EMovieType
	};
	ID: string;
};

//? <----- MUSIC ----->
export enum EMusicCategory {
	ANIME = 'Anime',
	GAME = 'Game',
	JAPANESE = 'Japanese',
	OTHER = 'Other',
	TOUHOU = 'Touhou'
}

export type TMusic = {
	artist: string;
	category: EMusicCategory;
	favourites: boolean;
	id: string;
	ID: string;
	imageURL: string;
	lastModified: number;
	link: string;
	owner: string;
	title: string;
}

export type TMusicInput = {
	musicInput: {
		artist: string;
		category: EMusicCategory;
		favourites: boolean;
		imageURL: string;
		link: string;
		title: string;
	}
	ID: string;
}

//? <----- NOTES ----->
export type TNote = {
	color: string;
	id: string;
	ID: string;
	lastModified: number;
	note: string;
	owner: string;
	title: string;
};

export type TNoteInput = {
	noteInput: {
		color: string;
		lastModified: number;
		note: string;
		title: string;
	};
	ID: string;
};

//? <----- USER ----->
export enum EUserRole {
	ADMIN = "ADMIN",
	USER = "USER",
};

export type TUser = {
	color: string;
	email: string;
	googleId: string;
	ID: string;
	profileDesc: string;
	profileImg: string;
	role: EUserRole;
	username: string;
};

export type TUserInput = {
	userInput: {
		color: string;
		profileDesc: string;
		profileImg: string;
		username: string;
	};
	ID: string;
};
