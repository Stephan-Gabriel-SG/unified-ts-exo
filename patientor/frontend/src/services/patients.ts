import axios from "axios";
import {
  ApiUpdateEntryResponse,
  EntryWithoutId,
  Patient,
  PatientFormValues,
} from "../types";

import { apiBaseUrl } from "../constants";
import { ZodError } from "zod";
const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const getById = async (id: string) => {
  const { data } = await axios.get<Patient | undefined>(
    `${apiBaseUrl}/patients/${id}`
  );
  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

const addEntry = async (
  id: string,
  object: EntryWithoutId
): Promise<ApiUpdateEntryResponse> => {
  try {
    const { data } = await axios.post<ApiUpdateEntryResponse>(
      `${apiBaseUrl}/patients/${id}/entries`,
      object
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const serverError = error.response.data;
        return {
          success: false,
          error: new ZodError(serverError),
        };
      } else if (error.request) {
        return {
          success: false,
          error: "Sorry. Server doesn't response at the moment.",
        };
      }
    }

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Sorry something went wrong. Please try again!",
    };
  }
};

export default {
  getAll,
  getById,
  create,
  addEntry,
};
