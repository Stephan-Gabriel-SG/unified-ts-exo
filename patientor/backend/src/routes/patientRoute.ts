import express, { Request, Response } from "express";
import {
  addEntries,
  addPatient,
  getPatientById,
  getPatients,
} from "../services/patientServices";
import { NonSensitivePatientInfo, Patient, Entry } from "../services/types";
import {
  errorMiddleware,
  newPatientEntry,
  newPatientParser,
} from "../middlewares/patientMiddleware";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatientInfo[]>) => {
  const patients = getPatients();
  res.status(200).json(
    patients.map((patient) => ({
      id: patient.id,
      name: patient.name,
      dateOfBirth: patient.dateOfBirth,
      gender: patient.gender,
      occupation: patient.occupation,
      entries: patient.entries,
    }))
  );
});

router.get("/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).json({ error: "bad request" });
    return;
  }
  const patient = getPatientById(id);
  if (!patient) {
    res.status(401).json({ error: "patient not found" });
    return;
  }
  res.status(200).json(patient);
});

router.post("/:id/entries", newPatientEntry, (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).json({ error: "bad request" });
    return;
  }
  const updatedPatient = addEntries(id, req.body as Entry);
  res.status(201).json({ success: true, updatedPatient });
});

router.post(
  "/",
  newPatientParser,
  (req: Request<unknown, unknown, Patient>, res: Response<Patient>) => {
    const addedPatient = addPatient(req.body);
    res.status(201).json(addedPatient);
  }
);

router.use(errorMiddleware);

export default router;
