import { Action } from "redux";
import { IActualAccountState } from "./state";

export enum actualAccountType {
  FETCH_ACCOUNT = "actualAccount/FETCH_ACCOUNT",
  SET_ACCOUNT = "actualAccount/SET_ACCOUNT",
}

export interface IFetchActualAccount extends Action<actualAccountType> {
  type: actualAccountType.FETCH_ACCOUNT;
}

export interface ISetActualAccount extends Action<actualAccountType> {
  type: actualAccountType.SET_ACCOUNT;
  payload: IActualAccountState["actualAccounts"];
}

export const fetchAccounts = (): IFetchActualAccount => ({
  type: actualAccountType.FETCH_ACCOUNT,
});

export const setAccounts = (
  payload: IActualAccountState["actualAccounts"]
): ISetActualAccount => ({
  type: actualAccountType.SET_ACCOUNT,
  payload,
});

export type ActualAccountAction = IFetchActualAccount | ISetActualAccount;
