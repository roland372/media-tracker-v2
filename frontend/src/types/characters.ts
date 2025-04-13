import { ETodoStatus } from './media';

export enum ECharacterSource {
  ANIME = 'Anime',
  GAME = 'Game',
  MANGA = 'Manga',
}

export enum ECharacterGender {
  FEMALE = 'Female',
  MALE = 'Male',
  OTHER = 'Other',
}

export type TCharacter = {
  favourites: boolean;
  gender: ECharacterGender;
  hairColor: string;
  imageURL: string;
  link: string;
  linkName: string;
  mal_id?: number;
  name: string;
  owner: string;
  series: string;
  source: ECharacterSource;
  charactersDone?: ETodoStatus;
  createdAt?: Date;
  updatedAt?: Date;
};
