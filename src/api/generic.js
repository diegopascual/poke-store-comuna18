import axiosInstance from "./config";

export const fetchDataFromUrl = async (url) => {
  const response = await axiosInstance.get(url);
  return response.data;
};
