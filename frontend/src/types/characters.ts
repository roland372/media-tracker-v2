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

export type TCommonCharacterProps = {
  favourites: boolean;
  gender: ECharacterGender;
  hairColor: string;
  imageURL: string;
  link: string;
  linkName: string;
  mal_id?: number;
  name: string;
  series: string;
  source: ECharacterSource;
  createdAt?: Date;
  updatedAt?: Date;
};

export type TCharacter = TCommonCharacterProps & {
  _id: string;
  ID: string;
  owner: string;
};

export type TCharacterInput = TCommonCharacterProps;
