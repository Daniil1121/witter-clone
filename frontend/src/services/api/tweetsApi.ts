import axios from "axios";
import { ITweet, ITweetsState } from "./../../store/ducks/tweets/contracts/state";

export interface Response<T> {
  status: "string";
  data: T;
}

const createAndReturnInstance = () => {
  const token = localStorage.getItem("twitter-token");

  const instance = axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return instance;
};

export const tweetsApi = {
  async fetchTWeetsAPI(): Promise<ITweet[]> {
    const { data } = await createAndReturnInstance().get<Response<ITweet[]>>("/tweets");
    return data.data;
  },
  async fetchTWeetByIdAPI(id: string): Promise<Response<ITweet>> {
    const { data } = await createAndReturnInstance().get(`/tweets/${id}`);
    return data;
  },
  fetchAddNewTWeetAPI(data: { text: string }): Promise<ITweet[]> {
    return createAndReturnInstance()
      .post("/tweets/create", data)
      .then(({ data }) => data);
  },
};
