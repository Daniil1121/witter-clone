import axios from "axios";
import {
  ITweet,
  ITweetsState,
} from "./../../store/ducks/tweets/contracts/state";

export const tweetsApi = {
  fetchTWeetsAPI(): Promise<ITweetsState["items"]> {
    return axios.get("/tweets").then(({ data }) => data);
  },
  async fetchTWeetByIdAPI(id: string): Promise<ITweet[]> {
    const response = await axios.get(`/tweets?_id=${id}`);
    const data: ITweet[] = await response.data;
    return data;
  },
  fetchAddNewTWeetAPI(data: ITweet): Promise<ITweet[]> {
    return axios.post("/tweets", data).then(({ data }) => data);
  },
};
