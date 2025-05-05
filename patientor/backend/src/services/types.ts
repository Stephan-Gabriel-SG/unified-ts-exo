import { z } from "zod";

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}
export enum EntryType {
  "HealthCheck" = "HealthCheck",
  "OccupationalHealthcare" = "OccupationalHealthcare",
  "Hospital" = "Hospital",
}

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}
export const baseEntryShema = z.object({
  id: z.string(),
  description: z.string().refine((val) => val.trim().length > 0),
  date: z.string().refine((val) => val.trim().length > 0),
  specialist: z.string().refine((val) => val.trim().length > 0),
  diagnosisCodes: z.array(z.string()).optional(),
  type: z.nativeEnum(EntryType),
});

export const healthCheckEntrySchema = z.object({
  healthCheckRating: z.nativeEnum(HealthCheckRating),
});

export const occupationalHealthcareEntrySchema = z.object({
  employerName: z.string().refine((val) => val.trim().length > 0, {
    message: "Employer name have not been defined",
  }),
  stickLeave: z
    .object({ startDate: z.string(), endDate: z.string() })
    .optional(),
});

export const hospitalEntrySchema = z.object({
  discharge: z.object({
    date: z.string().refine((val) => val.trim().length > 0, {
      message: "Discharge date have not been defined.",
    }),
    criteria: z.string().refine((val) => val.trim().length > 0, {
      message: "Discharge criteria have not been defined.",
    }),
  }),
});

export const idParser = z.string();
interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}
interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: {
    date: string;
    criteria: string;
  };
}
export type Entry =
  | HealthCheckEntry
  | OccupationalHealthcareEntry
  | HospitalEntry;

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;

// Define Entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entry, "id">;

export const newPatientSchema = z.object({
  id: z.string(),
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
});

export type Patient = z.infer<typeof newPatientSchema> & {
  entries: Entry[];
};

export type NonSensitivePatientInfo = Omit<Patient, "ssn" | "entries">;

// parser
export const parseDiagnosisCodes = (
  object: unknown
): Array<Diagnosis["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis["code"]>;
  }

  return object.diagnosisCodes as Array<Diagnosis["code"]>;
};
