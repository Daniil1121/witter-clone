// import { IActualAccountState } from "./state";
import { IRootState } from "./../../store";
import { IUserState } from "./state";

// export const selectAccounts = (state: IRootState): IActualAccountState =>
//   state.accounts;

// export const selectAccountsItems = (
//   state: IRootState
// ): IActualAccountState["actualAccounts"] =>
//   selectAccounts(state).actualAccounts;

export const selectUser = (state: IRootState): IUserState["user"] | null => state.user.user;
