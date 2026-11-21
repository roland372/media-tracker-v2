import { ETodoStatus } from './media';

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
  imageURL: string;
  link: string;
  linkName: string;
  mal_id?: number;
  owner: string;
  status: EAnimeStatus;
  title: string;
  type: EAnimeType;
  studio?: string;
  studioLink?: string;
  series?: string;
  /** Position within a series (1, 2, 1.1, …). Sheet column: seriesOrder */
  seriesOrder?: number;
  characters?: string;
  notes?: string;
  charactersDone?: ETodoStatus;
  createdAt?: Date;
  updatedAt?: Date;
};

export type TAnimeInput = TAnime;
