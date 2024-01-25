import axios from "axios";
import { Platform } from "react-native";
import { useUserStore } from "../../store/userStore";

export const httpClient = axios.create({
  baseURL: "https://api.tokenize-dev.com",
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json;charset=utf-8",
    "user-agent": `${Platform.OS};1.0.0`,
  },
});

httpClient.interceptors.request.use((value) => {
  value.headers["TOK-DEVICE-ID"] = useUserStore.getState().deviceToken;
  httpClient.defaults.headers.common["TOK-DEVICE-ID"] =
    useUserStore.getState().deviceToken;
  return value;
});
