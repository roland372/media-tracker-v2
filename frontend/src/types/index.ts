import {
  EAnimeStatus,
  EAnimeType,
  EBookStatus,
  ECharacterGender,
  ECharacterSource,
  EGameStatus,
  EGameType,
  // EGenshinImpactElement,
  // EGenshinImpactRegion,
  // EGenshinImpactTalentBook,
  // EGenshinImpactWeapon,
  // EHonkaiStarRailFaction,
  // EHonkaiStarRailPath,
  // EHonkaiStarRailType,
  EMangaStatus,
  EMangaType,
  EMovieStatus,
  EMovieType,
  EMusicCategory,
  EUserRole,
} from "@common/types";

//? <----- ANIME ----->
export type TAnime = {
  episodesMax: number;
  episodesMin: number;
  favourites: boolean;
  id: string;
  _id: string;
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
  episodesMax?: number;
  episodesMin?: number;
  favourites?: boolean;
  imageURL?: string;
  lastModified?: number;
  link1?: string;
  link1Name?: string;
  link2?: string;
  link2Name?: string;
  mal_id?: number;
  owner: string;
  rating?: number;
  status?: EAnimeStatus;
  title: string;
  type?: EAnimeType;
};

//? <----- BOOKS ----->
export type TBook = {
  author: string;
  favourites: boolean;
  genre: string;
  id: string;
  _id: string;
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
  author: string;
  favourites?: boolean;
  genre?: string;
  imageURL?: string;
  lastModified?: number;
  link1?: string;
  link1Name?: string;
  link2?: string;
  link2Name?: string;
  owner: string;
  pages?: number;
  rating?: number;
  status?: EBookStatus;
  title: string;
};

//? <----- CHARACTERS ----->
export type TCharacter = {
  favourites: boolean;
  gender: ECharacterGender;
  hairColor: string;
  id: string;
  _id: string;
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
  favourites?: boolean;
  gender?: ECharacterGender;
  hairColor?: string;
  imageURL?: string;
  lastModified?: number;
  link1?: string;
  link1Name?: string;
  mal_id?: number;
  name: string;
  owner: string;
  series?: string;
  source?: ECharacterSource;
};

//? <----- EMOTES ----->
export type TEmote = {
  favourites: boolean;
  id: string;
  _id: string;
  lastModified: number;
  name: string;
  url: string;
};

export type TEmoteInput = {
  favourites?: boolean;
  lastModified?: number;
  name: string;
  url: string;
};

//? <----- GAMES ----->
export type TGame = {
  favourites: boolean;
  id: string;
  _id: string;
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
  favourites?: boolean;
  imageURL?: string;
  lastModified?: number;
  link1?: string;
  link1Name?: string;
  link2?: string;
  link2Name?: string;
  owner: string;
  playtime?: number;
  rating?: number;
  status?: EGameStatus;
  title: string;
  type?: EGameType;
};

//? <----- MANGA ----->
export type TManga = {
  chaptersMax: number;
  chaptersMin: number;
  favourites: boolean;
  id: string;
  _id: string;
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
  chaptersMax?: number;
  chaptersMin?: number;
  favourites?: boolean;
  imageURL?: string;
  lastModified?: number;
  link1?: string;
  link1Name?: string;
  link2?: string;
  link2Name?: string;
  mal_id?: number;
  owner: string;
  rating?: number;
  status?: EMangaStatus;
  title: string;
  type?: EMangaType;
  volumesMax?: number;
  volumesMin?: number;
};

//? <----- MOVIES ----->
export type TMovie = {
  episodesMax: number;
  episodesMin: number;
  favourites: boolean;
  id: string;
  _id: string;
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
  type: EMovieType;
};

export type TMovieInput = {
  episodesMax?: number;
  episodesMin?: number;
  favourites?: boolean;
  imageURL?: string;
  lastModified?: number;
  link1?: string;
  link1Name?: string;
  link2?: string;
  link2Name?: string;
  owner: string;
  rating?: number;
  seasonsMax?: number;
  seasonsMin?: number;
  status?: EMovieStatus;
  title: string;
  type?: EMovieType;
};

//? <----- MUSIC ----->
export type TMusic = {
  artist: string;
  category: EMusicCategory;
  favourites: boolean;
  id: string;
  _id: string;
  imageURL: string;
  lastModified: number;
  link: string;
  owner: string;
  title: string;
};

export type TMusicInput = {
  artist: string;
  category?: EMusicCategory;
  favourites?: boolean;
  imageURL?: string;
  lastModified?: number;
  link?: string;
  owner: string;
  title: string;
};

export type TYouTubeVideo = {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    thumbnails: TThumbnailUrls;
  };
};

export type TThumbnailUrls = {
  high: {
    url: string;
  };
  medium: {
    url: string;
  };
  low: {
    url: string;
  };
};

//? <----- NOTES ----->
export type TNote = {
  color: string;
  id: string;
  _id: string;
  lastModified: number;
  note: string;
  owner: string;
  title: string;
};

export type TNoteInput = {
  color: string;
  lastModified: number;
  note?: string;
  owner: string;
  title: string;
};

//? <----- USER ----->
export type TUser = {
  _id: string;
  color: string;
  email: string;
  googleId: string;
  profileDesc: string;
  profileImg: string;
  role: EUserRole;
  username: string;
};

export type TUserInput = {
  color: string | undefined;
  profileDesc: string | undefined;
  profileImg: string | undefined;
  username: string | undefined;
};

//? <----- UTILS ----->
export type TNavLinks = {
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

export type TTheme = {
  primaryDark: string;
  primaryLight: string;
  primaryMedium: string;
  secondaryLight: string;
  secondaryMedium: string;
  textColor: string;
};
