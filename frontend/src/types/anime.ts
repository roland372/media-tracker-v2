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

export type TAnime = TCommonAnimeProps & {
  _id: string;
  ID: string;
  owner: string;
};

export type TAnimeInput = TCommonAnimeProps;
