// import produce, { Draft } from "immer";
// import { ActualAccountAction, actualAccountType } from "./actionCreators";
// import { IUserState } from "./state";

// const InitialAccountsState: IUserState = {
//   user: null,
// };

// export const accountReducer = produce(
//   (draft: Draft<IActualAccountState>, action: ActualAccountAction) => {
//     if (action.type === actualAccountType.FETCH_ACCOUNT) {
//       draft.actualAccounts = [];
//     }
//     if (action.type === actualAccountType.SET_ACCOUNT) {
//       draft.actualAccounts = action.payload;
//     }
//   },
//   InitialAccountsState
// );

import produce, { Draft } from "immer";
import { UserAction, userType } from "./actionCreators";
import { IUserState } from "./state";

const InitialAccountsState: IUserState = {
  user: null,
};
export const userReducer = produce((draft: Draft<IUserState>, action: UserAction) => {
  switch (action.type) {
    case userType.SET_USER:
      draft.user = action.payload;
      break;
    default:
      return draft;
  }
}, InitialAccountsState);
