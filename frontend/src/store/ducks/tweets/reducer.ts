import produce, { Draft } from "immer";
import { TweetsActions, TweetsActionType } from "./actionCreators/actionCreators";
import { AddingTweetState, DeleteTweetState, ITweetsState, LoadingState } from "./contracts/state";

const initialTweetsState: ITweetsState = {
  items: [],
  loadingStatus: LoadingState.NEVER,
  addedNewTweetStatus: AddingTweetState.LOADED,
  deleteTweetState: DeleteTweetState.NEVER,
};

export const tweetsReducer = produce((draft: Draft<ITweetsState>, action: TweetsActions) => {
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
    case TweetsActionType.SET_DELETE_STATE:
      draft.deleteTweetState = action.payload;
      break;
    case TweetsActionType.UPDATE_TWEET_STATE_BEFORE_DELETE:
      draft.items = draft.items.filter((tweet) => tweet._id !== action.payload);
      draft.deleteTweetState = DeleteTweetState.NEVER;
      break;
    case TweetsActionType.SET_ADDING_NEW_POST_STATE:
      draft.addedNewTweetStatus = action.payload;
      break;
  }
}, initialTweetsState);
