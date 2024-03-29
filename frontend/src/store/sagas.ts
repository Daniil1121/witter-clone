import { all } from "redux-saga/effects";
import { AccountsSaga } from "./ducks/actualAccount/saga";
import { topicsSaga } from "./ducks/actualTopics/saga";
import { tweetsSaga } from "./ducks/tweets/saga";
import { userSaga } from "./ducks/user/saga";

export default function* rootSaga() {
  yield all([tweetsSaga(), topicsSaga(), AccountsSaga(), userSaga()]);
}
