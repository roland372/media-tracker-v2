export enum EUserRole {
  ADMIN = "ADMIN",
  PROTECTED = "PROTECTED",
  USER = "USER",
}

export type TUser = {
  color: string;
  email: string;
  profileDesc: string;
  profileImg: string;
  role: EUserRole;
  username: string;
};
