import axios from "axios";

export const actualAccountApi = {
  fetchActualAccountAPI() {
    return axios.get("/actualUsers").then(({ data }) => data);
  },
};
