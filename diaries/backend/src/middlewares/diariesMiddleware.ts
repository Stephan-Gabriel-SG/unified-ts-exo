import { NextFunction, Request, Response } from "express";
import { newDiaryEntrySchema } from "../routes/utils";
import { z } from "zod";

export const newDiaryParser = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    newDiaryEntrySchema.parse(req.body);
    next();
  } catch (e: unknown) {
    next(e);
  }
};
export const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};
