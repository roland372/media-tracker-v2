export type TCommonEmoteProps = {
  favourites: boolean;
  name: string;
  url: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type TEmote = TCommonEmoteProps & {
  _id: string;
  id: string;
};

export type TEmoteInput = TCommonEmoteProps;
