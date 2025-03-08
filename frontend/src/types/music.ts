export enum EMusicCategory {
  ANIME = 'Anime',
  GAME = 'Game',
  JAPANESE = 'Japanese',
  OTHER = 'Other',
  TOUHOU = 'Touhou'
}

export type TCommonMusicProps = {
  artist: string;
  category: EMusicCategory;
  favourites: boolean;
  imageURL: string;
  link: string;
  title: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type TMusic = TCommonMusicProps & {
  _id: string;
  id: string;
  owner: string;
};

export type TMusicInput = TCommonMusicProps;

export type TYouTubeVideo = {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    thumbnails: TThumbnailUrls;
  };
};

export type TThumbnailUrls = {
  high: {
    url: string;
  };
  medium: {
    url: string;
  };
  low: {
    url: string;
  };
};
