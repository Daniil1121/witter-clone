import axios from "axios";
import { ITopicState } from "../../store/ducks/actualTopics/contracts/state";
import { ITweetsState } from "./../../store/ducks/tweets/contracts/state";

export const topicsApi = {
  fetchTTopicsAPI(): Promise<ITopicState["topics"]> {
    return axios.get("/themes").then(({ data }) => data);
  },
};
