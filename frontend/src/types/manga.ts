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

export type TManga = TCommonMangaProps & {
  _id: string;
  ID: string;
  owner: string;
};

export type TMangaInput = TCommonMangaProps;
