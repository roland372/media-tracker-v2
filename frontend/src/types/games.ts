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
  GACHA = 'Gacha',
  EXPANSION = 'Expansion',
}

export type TGame = {
  favourites: boolean;
  imageURL: string;
  link: string;
  linkName: string;
  owner: string;
  playtime: number;
  rating: number;
  status: EGameStatus;
  title: string;
  type: EGameType;
  developer?: string;
  developerLink?: string;
  notes?: string;
  youtubeLink?: string;
  createdAt?: Date;
  updatedAt?: Date;
};
