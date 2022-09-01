import { Action } from "redux";
import {
  AddingTweetState,
  DeleteTweetState,
  ITweet,
  ITweetsState,
  LoadingState,
} from "./../contracts/state";

export enum TweetsActionType {
  SET_TWEETS = "tweets/SET_TWEETS",
  FETCH_TWEETS = "tweets/FETCH_TWEETS",
  SET_LOADING_STATE = "tweets/SET_LOADING_STATE",
  SET_DELETE_STATE = "tweets/SET_DELETE_STATE",
  SET_ADDING_NEW_POST_STATE = "tweets/SET_ADDING_NEW_POST_STATE",
  ADD_NEW_TWEET = "tweets/ADD_NEW_TWEET",
  DELETE_TWEET = "tweets/DELETE_TWEET",
  UPDATE_TWEET_STATE_BEFORE_DELETE = "tweets/UPDATE_TWEET_STATE_BEFORE_DELETE",
}

export interface ISetTweetsAction extends Action<TweetsActionType> {
  type: TweetsActionType.SET_TWEETS;
  payload: ITweetsState["items"];
}

export interface IAddNewTweetAction extends Action<TweetsActionType> {
  type: TweetsActionType.ADD_NEW_TWEET;
  payload: string;
}

export interface IDeleteTweetAction extends Action<TweetsActionType> {
  type: TweetsActionType.DELETE_TWEET;
  payload: ITweet["_id"];
}
export interface IUpdateTweetStateBeforeDelete extends Action<TweetsActionType> {
  type: TweetsActionType.UPDATE_TWEET_STATE_BEFORE_DELETE;
  payload: ITweet["_id"];
}

export interface IFetchTweetsAction extends Action<TweetsActionType> {
  type: TweetsActionType.FETCH_TWEETS;
}

export interface ISetLoadingState extends Action<TweetsActionType> {
  type: TweetsActionType.SET_LOADING_STATE;
  payload: LoadingState;
}

export interface ISetDeleteState extends Action<TweetsActionType> {
  type: TweetsActionType.SET_DELETE_STATE;
  payload: DeleteTweetState;
}

export interface ISetAddingNewPostState extends Action<TweetsActionType> {
  type: TweetsActionType.SET_ADDING_NEW_POST_STATE;
  payload: AddingTweetState;
}

export const addNewTweet = (payload: string): IAddNewTweetAction => ({
  type: TweetsActionType.ADD_NEW_TWEET,
  payload,
});

export const setTweetsLoadingState = (
  payload: ITweetsState["loadingStatus"]
): ISetLoadingState => ({
  type: TweetsActionType.SET_LOADING_STATE,
  payload,
});

export const setTweetsDeletegState = (
  payload: ITweetsState["deleteTweetState"]
): ISetDeleteState => ({
  type: TweetsActionType.SET_DELETE_STATE,
  payload,
});

export const setAddingNewPostState = (
  payload: ITweetsState["addedNewTweetStatus"]
): ISetAddingNewPostState => ({
  type: TweetsActionType.SET_ADDING_NEW_POST_STATE,
  payload,
});

export const setTweets = (payload: ITweetsState["items"]): ISetTweetsAction => ({
  type: TweetsActionType.SET_TWEETS,
  payload,
});

export const fetchTweets = (): IFetchTweetsAction => ({
  type: TweetsActionType.FETCH_TWEETS,
});

export const deleteTweetAction = (payload: ITweet["_id"]): IDeleteTweetAction => ({
  type: TweetsActionType.DELETE_TWEET,
  payload,
});

export const updateStateBeforeDelete = (payload: ITweet["_id"]): IUpdateTweetStateBeforeDelete => ({
  type: TweetsActionType.UPDATE_TWEET_STATE_BEFORE_DELETE,
  payload,
});

export type TweetsActions =
  | ISetTweetsAction
  | ISetLoadingState
  | IFetchTweetsAction
  | IAddNewTweetAction
  | ISetAddingNewPostState
  | IUpdateTweetStateBeforeDelete
  | IDeleteTweetAction
  | ISetDeleteState;
