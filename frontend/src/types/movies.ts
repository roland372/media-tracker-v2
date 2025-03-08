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

export type TMovie = TCommonMovieProps & {
  _id: string;
  ID: string;
  owner: string;
};

export type TMovieInput = TCommonMovieProps;
