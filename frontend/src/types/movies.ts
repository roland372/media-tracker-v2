export enum EMovieStatus {
  WATCHING = 'Watching',
  COMPLETED = 'Completed',
  ON_HOLD = 'On-Hold',
  DROPPED = 'Dropped',
  PLAN_TO_WATCH = 'Plan to Watch',
}

export enum EMovieType {
  MOVIE = 'Movie',
  TV_SHOW = 'TV-Show',
}

export type TMovie = {
  episodesMax: number;
  episodesMin: number;
  favourites: boolean;
  imageURL: string;
  link: string;
  linkName: string;
  owner: string;
  rating: number;
  seasonsMax: number;
  seasonsMin: number;
  status: EMovieStatus;
  title: string;
  type: EMovieType;
  createdAt?: Date;
  updatedAt?: Date;
};
