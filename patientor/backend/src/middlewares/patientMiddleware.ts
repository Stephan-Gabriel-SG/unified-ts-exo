import { NextFunction, Request, Response } from "express";
import {
  baseEntryShema,
  EntryType,
  healthCheckEntrySchema,
  hospitalEntrySchema,
  newPatientSchema,
  occupationalHealthcareEntrySchema,
} from "../services/types";
import { z } from "zod";
import { v1 as uuid } from "uuid";

export const newPatientParser = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    newPatientSchema.parse({ id: uuid(), ...req.body });
    next();
  } catch (e) {
    next(e);
  }
};

export const newPatientEntry = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const baseEntry = baseEntryShema.parse({ id: uuid(), ...req.body });
    switch (baseEntry.type) {
      case EntryType.HealthCheck:
        healthCheckEntrySchema.parse({ ...req.body });
        next();
        break;
      case EntryType.Hospital:
        hospitalEntrySchema.parse({ ...req.body });
        next();
        break;
      case EntryType.OccupationalHealthcare:
        occupationalHealthcareEntrySchema.parse({ ...req.body });
        next();
        break;
    }
  } catch (e) {
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
    res.status(400).json(error.issues);
  } else {
    next(error);
  }
};
