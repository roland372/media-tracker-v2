import {
  EAnimeStatus,
  EAnimeType,
  EBookStatus,
  ECharacterGender,
  ECharacterSource,
  EGameStatus,
  EGameType,
  EGenshinImpactElement,
  EGenshinImpactRegion,
  EGenshinImpactTalentBook,
  EGenshinImpactWeapon,
  EHonkaiStarRailFaction,
  EHonkaiStarRailPath,
  EHonkaiStarRailType,
  EMangaStatus,
  EMangaType,
  EMovieStatus,
  EMovieType,
  EMusicCategory,
  EUserRole
} from '@common/types';

//? <----- UTILS ----->
export type TContext = {
  userFromContext: TUser[];
};

//? <----- ANIME ----->
type TCommonAnimeProps = {
  episodesMax: number;
  episodesMin: number;
  favourites: boolean;
  imageURL: string;
  lastModified: number;
  link1: string;
  link1Name: string;
  link2: string;
  link2Name: string;
  mal_id: number;
  rating: number;
  status: EAnimeStatus;
  title: string;
  type: EAnimeType;
};

export type TAnime = TCommonAnimeProps & {
  id: string;
  ID: string;
  owner: string;
};

export type TAnimeInput = {
  animeInput: Partial<TCommonAnimeProps>;
  ID: string;
};

//? <----- BOOKS ----->
type TCommonBookProps = {
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

export type TBook = TCommonBookProps & {
  id: string;
  ID: string;
  owner: string;
};

export type TBookInput = {
  bookInput: Partial<TCommonBookProps>;
  ID: string;
};

//? <----- CHARACTERS ----->
type TCommonCharacterProps = {
  favourites: boolean;
  gender: ECharacterGender;
  hairColor: string;
  imageURL: string;
  lastModified: number;
  link1: string;
  link1Name: string;
  mal_id: number;
  name: string;
  series: string;
  source: ECharacterSource;
};

export type TCharacter = TCommonCharacterProps & {
  id: string;
  ID: string;
  owner: string;
};

export type TCharacterInput = {
  characterInput: Partial<TCommonCharacterProps>;
  ID: string;
};

//? <----- EMOTES ----->
type TCommonEmoteProps = {
  favourites: boolean;
  lastModified: number;
  name: string;
  url: string;
};

export type TEmote = TCommonEmoteProps & {
  id: string;
  ID: string;
};

export type TEmoteInput = {
  emoteInput: Partial<TCommonEmoteProps>;
  ID: string;
};

//? <----- GAMES ----->
type TCommonGameProps = {
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

export type TGame = TCommonGameProps & {
  id: string;
  ID: string;
  owner: string;
};

export type TGameInput = {
  gameInput: Partial<TCommonGameProps>;
  ID: string;
};

//? <----- GENSHIN IMPACT ----->
type TCommonGenshinImpactCharacterProps = {
  avatar: string;
  element: EGenshinImpactElement;
  gender: ECharacterGender;
  lastModified: Date;
  name: string;
  rarity: 4 | 5;
  region: EGenshinImpactRegion;
  talentBook: EGenshinImpactTalentBook;
  version: string;
  weapon: EGenshinImpactWeapon;
};

export type TGenshinImpactCharacter = TCommonGenshinImpactCharacterProps & {
  id: string;
  ID: string;
};

export type TGenshinImpactCharacterInput = {
  characterInput: Partial<TCommonGenshinImpactCharacterProps>;
  ID: string;
};

export type TGenshinImpactBuildObj = {
  artifacts: string;
  artifactStats: {
    sands: string;
    goblet: string;
    circlet: string;
  };
  desiredStats: TStatusValue<string>;
  imageURL: string;
  role: string;
  weapon: TStatusValue<string>;
};

export type TStatusValue<T> = {
  status: boolean;
  value: T;
};

type TCommonGenshinImpactCharacterBuildProps = {
  characterId: string;
  constellation: TStatusValue<number>;
  favourites: boolean;
  imageURL: string;
  lastModified: Date;
  level: TStatusValue<string>;
  note: string;
  status: boolean;
  talents: {
    normalAttack: TStatusValue<number>;
    elementalSkill: TStatusValue<number>;
    elementalBurst: TStatusValue<number>;
  };
  builds: TGenshinImpactBuildObj[];
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
type TCommonHonkaiStarRailCharacterProps = {
  avatar: string;
  faction: EHonkaiStarRailFaction;
  gender: ECharacterGender;
  lastModified: Date;
  name: string;
  path: EHonkaiStarRailPath;
  rarity: 4 | 5;
  type: EHonkaiStarRailType;
  version: string;
};

export type THonkaiStarRailCharacter = TCommonHonkaiStarRailCharacterProps & {
  id: string;
  ID: string;
};

export type THonkaiStarRailCharacterInput = {
  characterInput: Partial<TCommonHonkaiStarRailCharacterProps>,
  ID: string;
};

export type THonkaiStarRailBuildObj = {
  desiredStats: TStatusValue<string>;
  imageURL: string;
  lightCone: TStatusValue<string>;
  planarOrnaments: string;
  planarOrnamentsStats: {
    linkRope: string;
    planarSphere: string;
  };
  relics: string;
  relicsStats: {
    body: string;
    feet: string;
  };
  role: string;
};

type TCommonHonkaiStarRailCharacterBuildProps = {
  abilities: {
    basicATK: TStatusValue<number>;
    skill: TStatusValue<number>;
    ultimate: TStatusValue<number>;
    talent: TStatusValue<number>;
  };
  builds: THonkaiStarRailBuildObj[];
  characterId: string;
  eidolon: TStatusValue<number>;
  favourites: boolean;
  imageURL: string;
  lastModified: Date;
  level: TStatusValue<string>;
  note: string;
  status: boolean;
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
type TCommonMangaProps = {
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

export type TManga = TCommonMangaProps & {
  id: string;
  ID: string;
  owner: string;
};

export type TMangaInput = {
  mangaInput: Partial<TCommonMangaProps>;
  ID: string;
};

//? <----- MOVIES ----->
type TCommonMovieProps = {
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
  type: EMovieType;
};

export type TMovie = TCommonMovieProps & {
  id: string;
  ID: string;
  owner: string;
};

export type TMovieInput = {
  movieInput: Partial<TCommonMovieProps>;
  ID: string;
};

//? <----- MUSIC ----->
export type TCommonMusicProps = {
  artist: string;
  category: EMusicCategory;
  favourites: boolean;
  imageURL: string;
  lastModified: number;
  link: string;
  title: string;
};

export type TMusic = TCommonMusicProps & {
  id: string;
  ID: string;
  owner: string;
};

export type TMusicInput = {
  musicInput: Partial<TCommonMusicProps>;
  ID: string;
};

//? <----- NOTES ----->
type TCommonNoteProps = {
  color: string;
  lastModified: number;
  note: string;
  title: string;
};

export type TNote = TCommonNoteProps & {
  id: string;
  ID: string;
  owner: string;
};

export type TNoteInput = {
  noteInput: Partial<TCommonNoteProps>;
  ID: string;
};

//? <----- USER ----->
type TCommonUserProps = {
  color: string;
  profileDesc: string;
  profileImg: string;
  username: string;
};

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
