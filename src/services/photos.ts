import axios from "axios";
import type { Photo } from "../types/photo";

const API_KEY = import.meta.env.VITE_API_KEY;
axios.defaults.baseURL = "https://api.pexels.com/v1/";
axios.defaults.headers.common["Authorization"] = API_KEY;
axios.defaults.params = {
  orientation: "landscape",
};

interface HTTPRespronse {
  photos: Photo[];
}

export const getPhotos = async (query: string) => {
  const response = await axios.get<HTTPRespronse>(`/search?query=${query}`);

  return response.data.photos;
};
