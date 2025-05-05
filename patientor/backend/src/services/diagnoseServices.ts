import { Diagnosis } from "./types";
import diagnoseData from "../data/diagnose";

export const getDiagnoses = (): Diagnosis[] => diagnoseData;
