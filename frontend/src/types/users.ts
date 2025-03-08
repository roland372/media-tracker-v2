export enum EUserRole {
  ADMIN = "ADMIN",
  PROTECTED = "PROTECTED",
  USER = "USER",
}

export type TCommonUserProps = {
  color: string;
  profileDesc: string;
  profileImg: string;
  username: string;
};

export type TUser = TCommonUserProps & {
  _id: string;
  email: string;
  googleId: string;
  role: EUserRole;
};

export type TUserInput = {
  color: string | undefined;
  profileDesc: string | undefined;
  profileImg: string | undefined;
  username: string | undefined;
};
