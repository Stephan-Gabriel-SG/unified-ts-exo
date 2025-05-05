import diaryData from "../data/entries";
import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from "./types";

const getEntries = (): DiaryEntry[] => {
  return diaryData;
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaryData.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility,
  }));
};

const findById = (id: number): DiaryEntry | undefined =>
  diaryData.find((d) => d.id === id);

const addDiary = (entry: NewDiaryEntry): DiaryEntry => {
  const newDiary = {
    id: Math.max(...diaryData.map((d) => d.id)) + 1,
    ...entry,
  };
  diaryData.push(newDiary);
  return newDiary;
};

export default {
  getEntries,
  findById,
  addDiary,
  getNonSensitiveEntries,
};
