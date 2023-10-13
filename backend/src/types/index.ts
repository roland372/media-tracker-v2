import {
  EUserRole,
  TCommonAnimeProps,
  TCommonBookProps,
  TCommonCharacterProps,
  TCommonEmoteProps,
  TCommonGameProps,
  TCommonGenshinImpactCharacterBuildProps,
  TCommonGenshinImpactCharacterProps,
  TCommonHonkaiStarRailCharacterBuildProps,
  TCommonHonkaiStarRailCharacterProps,
  TCommonMangaProps,
  TCommonMovieProps,
  TCommonMusicProps,
  TCommonNoteProps,
  TCommonUserProps,
} from '@common/types';

//? <----- UTILS ----->
export type TContext = {
  userFromContext: TUser[];
};

//? <----- ANIME ----->
export type TAnime = TCommonAnimeProps & {
  ID: string;
  owner: string;
};

export type TAnimeInput = {
  animeInput: Partial<TCommonAnimeProps>;
  ID: string;
};

//? <----- BOOKS ----->
export type TBook = TCommonBookProps & {
  ID: string;
  owner: string;
};

export type TBookInput = {
  bookInput: Partial<TCommonBookProps>;
  ID: string;
};

//? <----- CHARACTERS ----->
export type TCharacter = TCommonCharacterProps & {
  ID: string;
  owner: string;
};

export type TCharacterInput = {
  characterInput: Partial<TCommonCharacterProps>;
  ID: string;
};

//? <----- EMOTES ----->
export type TEmote = TCommonEmoteProps & {
  ID: string;
};

export type TEmoteInput = {
  emoteInput: Partial<TCommonEmoteProps>;
  ID: string;
};

//? <----- GAMES ----->
export type TGame = TCommonGameProps & {
  ID: string;
  owner: string;
};

export type TGameInput = {
  gameInput: Partial<TCommonGameProps>;
  ID: string;
};

//? <----- GENSHIN IMPACT ----->
export type TGenshinImpactCharacter = TCommonGenshinImpactCharacterProps & {
  id: string;
  ID: string;
};

export type TGenshinImpactCharacterInput = {
  characterInput: Partial<TCommonGenshinImpactCharacterProps>;
  ID: string;
};

export type TGenshinImpactCharacterBuild = TCommonGenshinImpactCharacterBuildProps & {
  id: string;
  ID: string;
  owner: string;
};

export type TGenshinImpactCharacterBuildInput = {
  buildInput: Partial<TCommonGenshinImpactCharacterBuildProps>;
  ID: string;
};

//? <----- HONKAI STAR RAIL ----->
export type THonkaiStarRailCharacter = TCommonHonkaiStarRailCharacterProps & {
  id: string;
  ID: string;
};

export type THonkaiStarRailCharacterInput = {
  characterInput: Partial<TCommonHonkaiStarRailCharacterProps>,
  ID: string;
};

export type THonkaiStarRailCharacterBuild = TCommonHonkaiStarRailCharacterBuildProps & {
  id: string;
  ID: string;
  owner: string;
};

export type THonkaiStarRailCharacterBuildInput = {
  buildInput: Partial<TCommonHonkaiStarRailCharacterBuildProps>,
  ID: string;
};

//? <----- MANGA ----->
export type TManga = TCommonMangaProps & {
  ID: string;
  owner: string;
};

export type TMangaInput = {
  mangaInput: Partial<TCommonMangaProps>;
  ID: string;
};

//? <----- MOVIES ----->
export type TMovie = TCommonMovieProps & {
  ID: string;
  owner: string;
};

export type TMovieInput = {
  movieInput: Partial<TCommonMovieProps>;
  ID: string;
};

//? <----- MUSIC ----->
export type TMusic = TCommonMusicProps & {
  ID: string;
  owner: string;
};

export type TMusicInput = {
  musicInput: Partial<TCommonMusicProps>;
  ID: string;
};

//? <----- NOTES ----->
export type TNote = TCommonNoteProps & {
  ID: string;
  owner: string;
};

export type TNoteInput = {
  noteInput: Partial<TCommonNoteProps>;
  ID: string;
};

//? <----- USER ----->
export type TUser = TCommonUserProps & {
  email: string;
  googleId: string;
  ID: string;
  role: EUserRole;
};

export type TUserInput = {
  userInput: Partial<TCommonUserProps>;
  ID: string;
};
