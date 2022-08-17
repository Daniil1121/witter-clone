import axios from "axios";
import { IUser } from "../../store/ducks/user/state";

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

export const loginApi = {
  async fetchLoginAPI(data: { username: string; password: string }): Promise<Response<IUser>> {
    const response = await createAndReturnInstance().post(`/auth/login`, data);
    return response.data.data;
  },
  async fetchMyProfile(): Promise<Response<IUser>> {
    const response = await createAndReturnInstance().get("/users/me");
    return response.data.data;
  },
};
