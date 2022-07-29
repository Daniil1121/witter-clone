import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  IAddNewTweetAction,
  setAddingNewPostState,
  setTweets,
  setTweetsLoadingState,
  TweetsActionType,
} from "./actionCreators/actionCreators";
import { tweetsApi } from "./../../../services/api/tweetsApi";
import {
  AddingTweetState,
  ITweetsState,
  LoadingState,
} from "./contracts/state";

export function* fetchTweetsRequest() {
  try {
    const items: ITweetsState["items"] = yield call(tweetsApi.fetchTWeetsAPI);
    yield put(setTweets(items.reverse()));
  } catch (error) {
    yield put(setTweetsLoadingState(LoadingState.ERROR));
  }
}

export function* addTweetRequest({ payload }: IAddNewTweetAction) {
  try {
    const data = {
      _id: Math.random().toString(36).substring(2),
      user: {
        fullname: "Flynn Mcfadden",
        name: "wilson",
        userAvatar: `https://picsum.photos/200/200?${Math.ceil(
          Math.random() * 10
        )}`,
      },
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
