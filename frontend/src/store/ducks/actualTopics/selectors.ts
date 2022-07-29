import { IRootState } from "./../../store";
import { ITopicState } from "./contracts/state";

export const selectTopics = (state: IRootState): ITopicState => state.topics;

export const selectTopicsItems = (state: IRootState) =>
  selectTopics(state).topics;
