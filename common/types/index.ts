//? <----- MEDIA ----->
export enum EMediaType {
  ANIME = "Anime",
  MANGA = "Manga",
  GAME = "Game",
  CHARACTER = "Character",
  MOVIE = "Movie",
  BOOK = "Book",
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

//? <----- BOOKS ----->
export enum EBookStatus {
  READING = 'Reading',
  COMPLETED = 'Completed',
  ON_HOLD = 'On-Hold',
  DROPPED = 'Dropped',
  PLAN_TO_READ = 'Plan to Read',
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

//? <----- MUSIC ----->
export enum EMusicCategory {
  ANIME = 'Anime',
  GAME = 'Game',
  JAPANESE = 'Japanese',
  OTHER = 'Other',
  TOUHOU = 'Touhou'
};

//? <----- USER ----->
export enum EUserRole {
  ADMIN = "ADMIN",
  PROTECTED = "PROTECTED",
  USER = "USER",
};