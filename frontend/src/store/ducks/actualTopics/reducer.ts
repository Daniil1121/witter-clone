import produce, { Draft } from "immer";
import { TopicActions, TopicActionType } from "./actionCreators";
import { ITopicState } from "./contracts/state";

const initialTopicState: ITopicState = {
  topics: [],
};

export const topicReducer = produce(
  (draft: Draft<ITopicState>, action: TopicActions) => {
    if (action.type === TopicActionType.FETCH_TOPICS) {
      draft.topics = [];
    }
    if (action.type === TopicActionType.SET_TOPICS) {
      draft.topics = action.payload;
    }
  },
  initialTopicState
);
