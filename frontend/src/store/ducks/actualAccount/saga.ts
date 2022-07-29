import { IActualAccountState } from "./state";
import { call, put, takeLatest } from "redux-saga/effects";
import { actualAccountApi } from "./../../../services/api/actualAccountApi";
import { actualAccountType, setAccounts } from "./actionCreators";

export function* fetchAccountsRequest() {
  try {
    const accounts: IActualAccountState["actualAccounts"] = yield call(
      actualAccountApi.fetchActualAccountAPI
    );
    yield put(setAccounts(accounts));
  } catch (error) {
    console.log(error);
  }
}

export function* AccountsSaga() {
  yield takeLatest(actualAccountType.FETCH_ACCOUNT, fetchAccountsRequest);
}
