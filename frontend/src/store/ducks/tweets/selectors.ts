import { IRootState } from "../../store";
import { ITweetsState } from "./contracts/state";

export const selectTweets = (state: IRootState): ITweetsState => state.tweets;

export const selectTweetsItems = (state: IRootState) =>
  selectTweets(state).items;

export const selectLoadingState = (state: IRootState) =>
  selectTweets(state).loadingStatus;

export const selectAddingNewTweetState = (state: IRootState) =>
  selectTweets(state).addedNewTweetStatus;
