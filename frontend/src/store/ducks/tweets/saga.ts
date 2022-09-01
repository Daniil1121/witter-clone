import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  IAddNewTweetAction,
  IDeleteTweetAction,
  setAddingNewPostState,
  setTweets,
  setTweetsDeletegState,
  setTweetsLoadingState,
  TweetsActionType,
  updateStateBeforeDelete,
} from "./actionCreators/actionCreators";
import { Response, tweetsApi } from "./../../../services/api/tweetsApi";
import {
  AddingTweetState,
  DeleteTweetState,
  ITweet,
  ITweetsState,
  LoadingState,
} from "./contracts/state";
const delay = (time: number) => new Promise((resolve) => setTimeout(resolve, time));

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
    yield call(tweetsApi.addNewTWeetAPI, data);
    yield fetchTweetsRequest();
  } catch (error) {
    yield put(setAddingNewPostState(AddingTweetState.ERROR));
    yield call(delay, 2000);
    yield put(setAddingNewPostState(AddingTweetState.LOADED));
  }
}

export function* deleteTWeet({ payload }: IDeleteTweetAction) {
  try {
    yield put(setTweetsDeletegState(DeleteTweetState.LOADING));
    yield call(tweetsApi.deleteTWeetByIdAPI, payload);
    yield put(updateStateBeforeDelete(payload));
  } catch (error) {
    yield put(setTweetsDeletegState(DeleteTweetState.ERROR));
    yield call(delay, 1);
    yield put(setTweetsDeletegState(DeleteTweetState.NEVER));
  }
}

export function* tweetsSaga() {
  yield takeLatest(TweetsActionType.FETCH_TWEETS, fetchTweetsRequest);
  yield takeLatest(TweetsActionType.ADD_NEW_TWEET, addTweetRequest);
  yield takeLatest(TweetsActionType.DELETE_TWEET, deleteTWeet);
}
