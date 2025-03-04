//? <----- MEDIA ----->
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

//? <----- QUERIES ----->
export enum EQueryParams {
  ALL = "ALL",
  FAVOURITES = "FAVOURITES",
  LIMIT = "LIMIT",
}

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

export type TCommonAnimeProps = {
  episodesMax: number;
  episodesMin: number;
  favourites: boolean;
  imageURL: string;
  link: string;
  linkName: string;
  mal_id?: number;
  rating: number;
  status: EAnimeStatus;
  title: string;
  type: EAnimeType;
  createdAt?: Date;
  updatedAt?: Date;
};

//? <----- BOOKS ----->
export enum EBookStatus {
  READING = 'Reading',
  COMPLETED = 'Completed',
  ON_HOLD = 'On-Hold',
  DROPPED = 'Dropped',
  PLAN_TO_READ = 'Plan to Read',
};

export type TCommonBookProps = {
  author: string;
  favourites: boolean;
  genre: string;
  imageURL: string;
  link: string;
  linkName: string;
  pages: number;
  rating: number;
  status: EBookStatus;
  title: string;
  createdAt?: Date;
  updatedAt?: Date;
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

export type TCommonCharacterProps = {
  favourites: boolean;
  gender: ECharacterGender;
  hairColor: string;
  imageURL: string;
  link: string;
  linkName: string;
  mal_id?: number;
  name: string;
  series: string;
  source: ECharacterSource;
  createdAt?: Date;
  updatedAt?: Date;
};

//? <----- EMOTES ----->
export type TCommonEmoteProps = {
  favourites: boolean;
  name: string;
  url: string;
  createdAt?: Date;
  updatedAt?: Date;
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

export type TCommonGameProps = {
  favourites: boolean;
  imageURL: string;
  link: string;
  linkName: string;
  playtime: number;
  rating: number;
  status: EGameStatus;
  title: string;
  type: EGameType;
  createdAt?: Date;
  updatedAt?: Date;
};

//? <----- GENSHIN IMPACT ----->
export enum EGenshinImpactElement {
  ANEMO = "Anemo",
  CRYO = "Cryo",
  DENDRO = "Dendro",
  ELECTRO = "Electro",
  GEO = "Geo",
  HYDRO = "Hydro",
  PYRO = "Pyro",
};

export enum EGenshinImpactRegion {
  MONDSTADT = "Mondstadt",
  LIYUE = "Liyue",
  INAZUMA = "Inazuma",
  SUMERU = "Sumeru",
  FONTAINE = "Fontaine",
  NATLAN = "Natlan",
  SNEZHNAAYA = "Snezhnaya",
  KHAENRIAH = "Khaenri'ah",
};

export enum EGenshinImpactTalentBook {
  FREEDOM = "Freedom",
  RESISTANCE = "Resistance",
  BALLAD = "Ballad",
  PROSPERITY = "Prosperity",
  DILIGENCE = "Diligence",
  GOLD = "Gold",
  TRANSIENCE = "Transience",
  ELEGANCE = "Elegance",
  LIGHT = "Light",
  ADMONITION = "Admonition",
  INGENUITY = "Ingenuity",
  PRAXIS = "Praxis",
  EQUITY = "Equity",
  JUSTICE = "Justice",
  ORDER = "Order",
};

export enum EGenshinImpactWeapon {
  BOW = "Bow",
  CATALYST = "Catalyst",
  CLAYMORE = "Claymore",
  POLEARM = "Polearm",
  SWORD = "Sword",
};

export type TStatusValue<T> = {
  status: boolean;
  value: T;
};

export type TCommonGenshinImpactCharacterProps = {
  element: EGenshinImpactElement;
  gender: ECharacterGender;
  images: {
    avatar: string;
    card: string;
    multiWish: string;
    namecard: string;
  },
  name: string;
  rarity: 4 | 5;
  region: EGenshinImpactRegion;
  talentBook: EGenshinImpactTalentBook;
  version: string;
  weapon: EGenshinImpactWeapon;
};

export type TGenshinImpactBuildObj = {
  artifacts: string;
  artifactStats: {
    sands: string;
    goblet: string;
    circlet: string;
  };
  desiredStats: TStatusValue<string>;
  imageURL: string; // enka build image
  role: string;
  weapon: TStatusValue<string>;
};

export type TCommonGenshinImpactCharacterBuildProps = {
  characterId: string;
  constellation: TStatusValue<number>;
  favourites: boolean;
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

//? <----- HONKAI STAR RAIL ----->
export enum EHonkaiStarRailFaction {
  ASTRAL_EXPRESS = "Astral Express",
  STELLARON_HUNTERS = "Stellaron Hunters",
  HERTA_SPACE_STATION = "Herta Space Station",
  JARILO_VI = "Jarilo-VI",
  THE_XIANZHOU_LUOFU = "The Xianzhou Luofu",
};

export enum EHonkaiStarRailPath {
  THE_DESTRUCTION = "The Destruction",
  THE_HUNT = "The Hunt",
  THE_ERUDITION = "The Erudition",
  THE_HARMONY = "The Harmony",
  THE_NIHILITY = "The Nihility",
  THE_PRESERVATION = "The Preservation",
  THE_ABUNDANCE = "The Abundance",
};

export enum EHonkaiStarRailType {
  PHYSICAL = "Physical",
  FIRE = "Fire",
  ICE = "Ice",
  LIGHTNING = "Lightning",
  WIND = "Wind",
  QUANTUM = "Quantum",
  IMAGINARY = "Imaginary",
};

export type TCommonHonkaiStarRailCharacterProps = {
  avatar: string;
  faction: EHonkaiStarRailFaction;
  gender: ECharacterGender;
  name: string;
  path: EHonkaiStarRailPath;
  rarity: 4 | 5;
  type: EHonkaiStarRailType;
  version: string;
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

export type TCommonHonkaiStarRailCharacterBuildProps = {
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
  level: TStatusValue<string>;
  note: string;
  status: boolean;
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

export type TCommonMangaProps = {
  chaptersMax: number;
  chaptersMin: number;
  favourites: boolean;
  imageURL: string;
  link: string;
  linkName: string;
  mal_id?: number;
  rating: number;
  status: EMangaStatus;
  title: string;
  type: EMangaType;
  volumesMax: number;
  volumesMin: number;
  createdAt?: Date;
  updatedAt?: Date;
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

export type TCommonMovieProps = {
  episodesMax: number;
  episodesMin: number;
  favourites: boolean;
  imageURL: string;
  link: string;
  linkName: string;
  rating: number;
  seasonsMax: number;
  seasonsMin: number;
  status: EMovieStatus;
  title: string;
  type: EMovieType;
  createdAt?: Date;
  updatedAt?: Date;
};

//? <----- MUSIC ----->
export enum EMusicCategory {
  ANIME = 'Anime',
  GAME = 'Game',
  JAPANESE = 'Japanese',
  OTHER = 'Other',
  TOUHOU = 'Touhou'
};

export type TCommonMusicProps = {
  artist: string;
  category: EMusicCategory;
  favourites: boolean;
  imageURL: string;
  link: string;
  title: string;
  createdAt?: Date;
  updatedAt?: Date;
};

//? <----- NOTES ----->
export type TCommonNoteProps = {
  color: string;
  note: string;
  title: string;
  createdAt?: Date;
  updatedAt?: Date;
};

//? <----- USER ----->
export enum EUserRole {
  ADMIN = "ADMIN",
  PROTECTED = "PROTECTED",
  USER = "USER",
};

export type TCommonUserProps = {
  color: string;
  profileDesc: string;
  profileImg: string;
  username: string;
};