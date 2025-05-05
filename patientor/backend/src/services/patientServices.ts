import { Entry, Patient } from "./types";
import patientData from "../data/patients";

export const getPatients = (): Patient[] => patientData;

export const getPatientById = (id: string): Patient | undefined =>
  patientData.find((patient) => patient.id === id);

export const addEntries = (id: string, newEntry: Entry) => {
  const index = patientData.findIndex((patient) => patient.id === id);
  if (index === -1) {
    throw new Error(`Patient with id ${id} not found`);
  }
  const updatedPatient = {
    ...patientData[index],
    entries: [...patientData[index].entries, newEntry],
  };
  patientData[index] = updatedPatient;
  return updatedPatient;
};

export const addPatient = (newPatient: Patient): Patient => {
  patientData.push(newPatient);
  return newPatient;
};
