import axios from "axios";

const axiosInstance = axios.create({
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const POKEAPI_BASE_URL = "https://pokeapi.co/api/v2";
export const pokeApiInstance = axiosInstance.create({
  baseURL: POKEAPI_BASE_URL,
});

export default axiosInstance;
