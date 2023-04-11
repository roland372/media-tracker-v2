//? <----- User ----->
export enum EUserRole {
	ADMIN = "ADMIN",
	USER = "USER",
}

export type TUser = {
	color: string;
	email: string;
	googleId: string;
	profileDesc: string;
	profileImg: string;
	role: EUserRole;
	username: string;
	uid: string;
}

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
		lastModified: number;
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
		lastModified: number;
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
		lastModified: number;
		link1: string;
		link1Name: string;
		name: string;
		series: string;
		source: ECharacterSource;
	};
	ID: string;
};

//? <----- Emotes ----->
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

//? <----- Notes ----->
export enum ENoteColor {
	PRIMARY = 'Primary',
	SECONDARY = 'Secondary',
	SUCCESS = 'Success',
	DANGER = 'Danger',
	WARNING = 'Warning',
	INFO = 'Info',
	LIGHT = 'Light',
	DARK = 'Dark',
	MUTED = 'Muted',
	WHITE = 'White',
}

export type TNote = {
	color: ENoteColor;
	id: string;
	ID: string;
	lastModified: number;
	note: string;
	title: string;
};

export type TNoteInput = {
	noteInput: {
		color: ENoteColor;
		lastModified: number;
		note: string;
		title: string;
	};
	ID: string;
};
