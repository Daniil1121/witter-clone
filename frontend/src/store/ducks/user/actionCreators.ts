import { Action } from "redux";
import { IReqLogin, IUser } from "./state";

export enum userType {
  LOGIN = "user/LOGIN",
  GET_MY_PROFILE = "user/GET_MY_PROFILE",
  SET_USER = "user/SET_USER",
}

export interface IFetchLoginUser extends Action<userType> {
  type: userType.LOGIN;
  payload: IReqLogin;
}
export interface IFetchMyProfile extends Action<userType> {
  type: userType.GET_MY_PROFILE;
}
export interface ISetUser extends Action<userType> {
  type: userType.SET_USER;
  payload: IUser;
}

export const fetchLoginUser = (payload: IReqLogin): IFetchLoginUser => ({
  type: userType.LOGIN,
  payload,
});

export const setUser = (payload: IUser): ISetUser => ({
  type: userType.SET_USER,
  payload,
});

export const getMyProfile = (): IFetchMyProfile => ({
  type: userType.GET_MY_PROFILE,
});

export type UserAction = IFetchLoginUser | ISetUser | IFetchMyProfile;
