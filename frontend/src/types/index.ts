import {
  // EGenshinImpactElement,
  // EGenshinImpactRegion,
  // EGenshinImpactTalentBook,
  // EGenshinImpactWeapon,
  // EHonkaiStarRailFaction,
  // EHonkaiStarRailPath,
  // EHonkaiStarRailType,
  EUserRole,
  TCommonAnimeProps,
  TCommonBookProps,
  TCommonCharacterProps,
  TCommonEmoteProps,
  TCommonGameProps,
  TCommonMangaProps,
  TCommonMovieProps,
  TCommonMusicProps,
  TCommonNoteProps,
  TCommonUserProps,
} from "@common/types";

//? <----- ANIME ----->
export type TAnime = TCommonAnimeProps & {
  _id: string;
  ID: string;
  owner: string;
};

export type TAnimeInput = TCommonAnimeProps;

//? <----- BOOKS ----->
export type TBook = TCommonBookProps & {
  _id: string;
  ID: string;
  owner: string;
};

export type TBookInput = TCommonBookProps;

//? <----- CHARACTERS ----->
export type TCharacter = TCommonCharacterProps & {
  _id: string;
  ID: string;
  owner: string;
};

export type TCharacterInput = TCommonCharacterProps;

//? <----- EMOTES ----->
export type TEmote = TCommonEmoteProps & {
  _id: string;
  id: string;
};

export type TEmoteInput = TCommonEmoteProps;

//? <----- GAMES ----->
export type TGame = TCommonGameProps & {
  _id: string;
  ID: string;
  owner: string;
};

export type TGameInput = TCommonGameProps;

//? <----- MANGA ----->
export type TManga = TCommonMangaProps & {
  _id: string;
  ID: string;
  owner: string;
};

export type TMangaInput = TCommonMangaProps;

//? <----- MOVIES ----->
export type TMovie = TCommonMovieProps & {
  _id: string;
  ID: string;
  owner: string;
};

export type TMovieInput = TCommonMovieProps;

//? <----- MUSIC ----->
export type TMusic = TCommonMusicProps & {
  _id: string;
  id: string;
  owner: string;
};

export type TMusicInput = TCommonMusicProps;

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
export type TNote = TCommonNoteProps & {
  _id: string;
  ID: string;
  owner: string;
};

export type TNoteInput = TCommonNoteProps;

//? <----- USER ----->
export type TUser = TCommonUserProps & {
  _id: string;
  email: string;
  googleId: string;
  role: EUserRole;
};

export type TUserInput = {
  color: string | undefined;
  profileDesc: string | undefined;
  profileImg: string | undefined;
  username: string | undefined;
};

//? <----- UTILS ----->
export type TMedia = TAnime | TBook | TCharacter | TGame | TManga | TMovie;
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
