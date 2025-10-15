import axios from "axios";

export const callApi = axios.create({
  baseURL: "http://localhost",
  withCredentials: true,
});
