import { Action } from "redux";
import { ITopicState } from "./contracts/state";

export enum TopicActionType {
  FETCH_TOPICS = "topics/FETCH_TOPICS",
  SET_TOPICS = "topics/SET_TOPICS",
}

export interface IFetchTopicsAction extends Action<TopicActionType> {
  type: TopicActionType.FETCH_TOPICS;
}

export interface ISetTopicsAction extends Action<TopicActionType> {
  type: TopicActionType.SET_TOPICS;
  payload: ITopicState["topics"];
}

export const fetchTopics = (): IFetchTopicsAction => ({
  type: TopicActionType.FETCH_TOPICS,
});

export const SetTopics = (
  payload: ITopicState["topics"]
): ISetTopicsAction => ({
  type: TopicActionType.SET_TOPICS,
  payload,
});

export type TopicActions = ISetTopicsAction | IFetchTopicsAction;
