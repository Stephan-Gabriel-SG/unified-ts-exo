import { z } from "zod";
import { newDiaryEntrySchema } from "../routes/utils";

export enum Weather {
  Sunny = "sunny",
  Rainy = "rainy",
  Cloudy = "cloudy",
  Stormy = "stormy",
  Windy = "windy",
}

export enum Visibility {
  Great = "great",
  Good = "good",
  Ok = "ok",
  Poor = "poor",
}

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, "comment">;

export type NewDiaryEntry = z.infer<typeof newDiaryEntrySchema>;

export interface DiaryEntry extends NewDiaryEntry {
  id: number;
}
