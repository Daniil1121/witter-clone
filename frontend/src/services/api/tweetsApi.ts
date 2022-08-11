import axios from "axios";
import { ITweet, ITweetsState } from "./../../store/ducks/tweets/contracts/state";

export interface Response<T> {
  status: "string";
  data: T;
}

export const tweetsApi = {
  async fetchTWeetsAPI(): Promise<ITweet[]> {
    const { data } = await axios.get<Response<ITweet[]>>("/tweets");
    return data.data;
  },
  async fetchTWeetByIdAPI(id: string): Promise<Response<ITweet>> {
    const { data } = await axios.get(`/tweets/${id}`);
    debugger;
    return data;
  },
  fetchAddNewTWeetAPI(data: ITweet): Promise<ITweet[]> {
    return axios.post("/tweets", data).then(({ data }) => data);
  },
};
