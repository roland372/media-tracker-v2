import { EAnimeStatus, EBookStatus, ECharacterSource, EGameStatus, EMangaStatus, EMovieStatus, EUserRole, TAnime, TBook, TCharacter, TEmote, TGame, TManga, TMovie } from '.';

export type TMediaStatus =
  | EAnimeStatus
  | EBookStatus
  | ECharacterSource
  | EGameStatus
  | EMangaStatus
  | EMovieStatus;

export enum EMediaType {
  ANIME = "Anime",
  MANGA = "Manga",
  GAME = "Game",
  CHARACTER = "Character",
  MOVIE = "Movie",
  BOOK = "Book",
}

export type TMediaCount = {
  anime: string;
  books: string;
  characters: string;
  emotes: string;
  games: string;
  manga: string;
  movies: string;
  music: string;
  notes: string;
};


export type TMedia = TAnime | TBook | TCharacter | TGame | TManga | TMovie;
export type TNavLinks = {
  color: string;
  icon: string;
  name: string;
  route: EUserRole;
  url: string;
  text: string;
  title: string;
};

export type TSortingOptions = {
  sortField: string;
  sortOrder: "asc" | "desc";
};

export type TDateRange = {
  start?: string;
  end?: string;
};

export type TTheme = {
  primaryDark: string;
  primaryLight: string;
  primaryMedium: string;
  secondaryLight: string;
  secondaryMedium: string;
  textColor: string;
};

export type TMediaData = {
  anime: TAnime[];
  books: TBook[];
  characters: TCharacter[];
  emotes: TEmote[];
  games: TGame[];
  manga: TManga[];
  movies: TMovie[];
};

export enum ETodoStatus {
	COMPLETED = "Completed",
	SKIP = "Skip",
	TODO = "Todo",
	INCOMPLETE = "Incomplete"
}
