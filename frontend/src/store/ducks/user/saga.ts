import { IReqLogin, IUser, IUserState } from "./state";
import { call, put, takeLatest } from "redux-saga/effects";
// import { actualAccountApi } from "./../../../services/api/actualAccountApi";
// import { actualAccountType, setAccounts } from "./actionCreators";
import { loginApi } from "../../../services/api/LoginApi";
import { IFetchLoginUser, setUser, userType } from "./actionCreators";

// export function* fetchAccountsRequest() {
//   try {
//     const accounts: IActualAccountState["actualAccounts"] = yield call(
//       actualAccountApi.fetchActualAccountAPI
//     );
//     yield put(setAccounts(accounts));
//   } catch (error) {
//     console.log(error);
//   }
// }

// export function* AccountsSaga() {
//   yield takeLatest(actualAccountType.FETCH_ACCOUNT, fetchAccountsRequest);
// }

export function* fetchLoginRequest({ payload }: IFetchLoginUser) {
  try {
    const reqData = payload;
    const { user }: IUserState = yield call(loginApi.fetchLoginAPI, reqData);
    if (user) {
      localStorage.setItem("twitter-token", user.token!);
      yield put(setUser(user));
    }
  } catch (error) {
    console.log(error);
  }
}

export function* fetchMyProfile() {
  try {
    const user: IUserState["user"] = yield call(loginApi.fetchMyProfile);
    if (user) {
      yield put(setUser(user));
    }
  } catch (error) {}
}

export function* userSaga() {
  yield takeLatest(userType.LOGIN, fetchLoginRequest);
  yield takeLatest(userType.GET_MY_PROFILE, fetchMyProfile);
}
