import produce, { Draft } from "immer";
import {
  TweetsActions,
  TweetsActionType,
} from "./actionCreators/actionCreators";
import {
  AddingTweetState,
  ITweetsState,
  LoadingState,
} from "./contracts/state";

const initialTweetsState: ITweetsState = {
  items: [],
  loadingStatus: LoadingState.NEVER,
  addedNewTweetStatus: AddingTweetState.LOADED,
};

export const tweetsReducer = produce(
  (draft: Draft<ITweetsState>, action: TweetsActions) => {
    switch (action.type) {
      case TweetsActionType.SET_TWEETS:
        draft.items = action.payload;
        draft.loadingStatus = LoadingState.LOADED;
        draft.addedNewTweetStatus = AddingTweetState.LOADED;
        break;
      case TweetsActionType.FETCH_TWEETS:
        draft.loadingStatus = LoadingState.LOADING;
        draft.items = [];
        break;
      case TweetsActionType.SET_LOADING_STATE:
        draft.loadingStatus = action.payload;
        break;
      case TweetsActionType.ADD_NEW_TWEET:
        draft.addedNewTweetStatus = AddingTweetState.LOADING;
        break;
      case TweetsActionType.SET_ADDING_NEW_POST_STATE:
        draft.addedNewTweetStatus = action.payload;
        break;
    }
  },
  initialTweetsState
);
