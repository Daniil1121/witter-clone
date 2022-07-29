import { call, put, takeLatest } from "redux-saga/effects";
import { ITopicState } from "./contracts/state";
import { topicsApi } from "./../../../services/api/topicsAPI";
import { SetTopics, TopicActionType } from "./actionCreators";

export function* fetchTopicsRequest() {
  try {
    const topics: ITopicState["topics"] = yield call(topicsApi.fetchTTopicsAPI);
    yield put(SetTopics(topics));
  } catch (error) {
    console.log(error);
  }
}

export function* topicsSaga() {
  yield takeLatest(TopicActionType.FETCH_TOPICS, fetchTopicsRequest);
}
