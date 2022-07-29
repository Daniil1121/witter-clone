import produce, { Draft } from "immer";
import { ActualAccountAction, actualAccountType } from "./actionCreators";
import { IActualAccountState } from "./state";

const InitialAccountsState: IActualAccountState = {
  actualAccounts: [],
};

export const accountReducer = produce(
  (draft: Draft<IActualAccountState>, action: ActualAccountAction) => {
    if (action.type === actualAccountType.FETCH_ACCOUNT) {
      draft.actualAccounts = [];
    }
    if (action.type === actualAccountType.SET_ACCOUNT) {
      draft.actualAccounts = action.payload;
    }
  },
  InitialAccountsState
);
