import axios from "axios";

export interface Response<T> {
  status: "string";
  data: T;
}
