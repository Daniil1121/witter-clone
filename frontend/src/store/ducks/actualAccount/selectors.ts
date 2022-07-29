import { IActualAccountState } from "./state";
import { IRootState } from "./../../store";

export const selectAccounts = (state: IRootState): IActualAccountState =>
  state.accounts;

export const selectAccountsItems = (
  state: IRootState
): IActualAccountState["actualAccounts"] =>
  selectAccounts(state).actualAccounts;
