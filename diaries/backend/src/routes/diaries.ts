import express, { Request, Response } from "express";
import diaryServices from "../services/diaryServices";
import {
  DiaryEntry,
  NewDiaryEntry,
  NonSensitiveDiaryEntry,
} from "../services/types";
import {
  errorMiddleware,
  newDiaryParser,
} from "../middlewares/diariesMiddleware";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitiveDiaryEntry[]>) => {
  res.status(200).json(diaryServices.getNonSensitiveEntries());
});

router.get("/:id", (req, res) => {
  const diary = diaryServices.findById(Number(req.params.id));
  if (!diary) {
    res.status(404);
  } else {
    res.status(200).json(diary);
  }
});

router.post(
  "/",
  newDiaryParser,
  (
    req: Request<unknown, unknown, NewDiaryEntry>,
    res: Response<DiaryEntry>
  ) => {
    const addedDiary = diaryServices.addDiary(req.body);
    res.status(201).json(addedDiary);
  }
);

router.use(errorMiddleware);

export default router;
