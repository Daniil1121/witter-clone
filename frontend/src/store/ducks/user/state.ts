export interface IUser {
  confirmed: boolean;
  _id: string;
  email: string;
  fullname: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  token?: string;
}

export interface IUserState {
  user: IUser | null;
}

export interface IReqLogin {
  username: string;
  password: string;
}
