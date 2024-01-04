import Axios from "axios";
import { API_URL } from "../constants";

export const getSummary = async (url: string) => {
  try {
    const response = await Axios.get(`${API_URL}/summary?url=${url}`);
    return response.data;
  } catch (error) {
    return error;
  }
};
