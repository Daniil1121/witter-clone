import { all } from "redux-saga/effects";
import { AccountsSaga } from "./ducks/actualAccount/saga";
import { topicsSaga } from "./ducks/actualTopics/saga";
import { tweetsSaga } from "./ducks/tweets/saga";

export default function* rootSaga() {
  yield all([tweetsSaga(), topicsSaga(), AccountsSaga()]);
}
