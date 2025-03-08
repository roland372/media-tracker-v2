export enum EGameStatus {
  PLAYING = 'Playing',
  COMPLETED = 'Completed',
  ON_HOLD = 'On-Hold',
  DROPPED = 'Dropped',
  PLAN_TO_PLAY = 'Plan to Play',
}

export enum EGameType {
  GAME = 'Game',
  VISUAL_NOVEL = 'Visual Novel',
}

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

export type TGame = TCommonGameProps & {
  _id: string;
  ID: string;
  owner: string;
};

export type TGameInput = TCommonGameProps;
