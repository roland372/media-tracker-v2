import { ETodoStatus } from './media';

export enum EMangaStatus {
  READING = 'Reading',
  COMPLETED = 'Completed',
  ON_HOLD = 'On-Hold',
  DROPPED = 'Dropped',
  PLAN_TO_READ = 'Plan to Read',
}

export enum EMangaType {
  DOUJINSHI = 'Doujinshi',
  LIGHT_NOVEL = 'Light Novel',
  MANGA = 'Manga',
  MANHUA = 'Manhua',
  NOVEL = 'Novel',
  ONE_SHOT = 'One-shot',
  WEBTOON = 'Webtoon',
}

export type TManga = {
  chaptersMax: number;
  chaptersMin: number;
  favourites: boolean;
  imageURL: string;
  link: string;
  linkName: string;
  mal_id?: number;
  owner: string;
  status: EMangaStatus;
  title: string;
  type: EMangaType;
  volumesMax: number;
  volumesMin: number;
  author?: string;
  authorLink?: string;
  charactersDone?: ETodoStatus;
  createdAt?: Date;
  updatedAt?: Date;
};
