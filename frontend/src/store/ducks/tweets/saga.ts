import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  IAddNewTweetAction,
  setAddingNewPostState,
  setTweets,
  setTweetsLoadingState,
  TweetsActionType,
} from "./actionCreators/actionCreators";
import { Response, tweetsApi } from "./../../../services/api/tweetsApi";
import { AddingTweetState, ITweetsState, LoadingState } from "./contracts/state";

export function* fetchTweetsRequest() {
  try {
    const response: ITweetsState["items"] = yield call(tweetsApi.fetchTWeetsAPI);
    yield put(setTweets(response.reverse()));
  } catch (error) {
    yield put(setTweetsLoadingState(LoadingState.ERROR));
  }
}

export function* addTweetRequest({ payload }: IAddNewTweetAction) {
  try {
    const data = {
      text: payload,
    };
    yield call(tweetsApi.fetchAddNewTWeetAPI, data);
    yield fetchTweetsRequest();
  } catch (error) {
    yield put(setAddingNewPostState(AddingTweetState.ERROR));
  }
}

export function* tweetsSaga() {
  yield takeLatest(TweetsActionType.FETCH_TWEETS, fetchTweetsRequest);
  yield takeLatest(TweetsActionType.ADD_NEW_TWEET, addTweetRequest);
}
