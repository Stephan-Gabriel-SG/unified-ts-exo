import axios from "axios";
import { Diary, NewDiary } from "./types";

const urlBase = "http://localhost:3000";
export const getDiaries = async () => {
  try {
    const data = await axios.get<Diary[]>(`${urlBase}/api/diaries`);
    return data.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      throw new Error(e.message);
    }
    console.error(e);
    throw new Error("something went wrong during data fetch");
  }
};

export const addDiary = async (newDiary: NewDiary) => {
  try {
    const data = await axios.post(`${urlBase}/api/diaries`, newDiary);
    return data.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      throw new Error(e.message);
    }
    console.error(e);
    throw new Error("something went wrong during data fetch");
  }
};
