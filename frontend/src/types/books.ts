export enum EBookStatus {
  READING = 'Reading',
  COMPLETED = 'Completed',
  ON_HOLD = 'On-Hold',
  DROPPED = 'Dropped',
  PLAN_TO_READ = 'Plan to Read',
}

export type TBook = {
  author: string;
  favourites: boolean;
  genre: string;
  imageURL: string;
  link: string;
  linkName: string;
  notes?: string;
  owner: string;
  pages: number;
  status: EBookStatus;
  title: string;
  createdAt?: Date;
  updatedAt?: Date;
};
