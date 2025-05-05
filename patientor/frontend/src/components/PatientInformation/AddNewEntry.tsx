import {
  Alert,
  Button,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { SetStateAction, useState } from "react";
import { EntryType, HealthCheckRating, Patient } from "../../types";
import patientService from "../../services/patients";
import { ZodError } from "zod";
import { Add, Close } from "@mui/icons-material";

const initFormValue = {
  description: "",
  date: "",
  specialist: "",
  diagnosisCodes: [""],
  type: EntryType.HealthCheck,
  healthCheckRating: 0,
  employerName: "",
  sickLeave: {
    startDate: "",
    endDate: "",
  },
  discharge: {
    date: "",
    criteria: "",
  },
};
const NewEntryForm = ({
  id,
  setPatient,
}: {
  id: string;
  setPatient: React.Dispatch<SetStateAction<Patient>>;
}) => {
  const [formData, setFormData] = useState(initFormValue);
  const [showForm, setShowForm] = useState(false);
  const [alert, setAlert] = useState<{
    status: "success" | "error";
    message: string;
  }>({ status: "success", message: "" });

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const result = await patientService.addEntry(id, formData);

    if (result.success === true) {
      const updatedPatient = result.updatedPatient;
      setPatient(updatedPatient);
      setAlert({
        status: "success",
        message: `New entry added to ${updatedPatient.name}`,
      });
      setFormData(initFormValue);
      setShowForm(false);
      setTimeout(() => {
        setAlert({ ...alert, message: "" });
      }, 5000);
    } else {
      if (
        typeof result.error === "object" &&
        result.error !== null &&
        "issues" in result.error
      ) {
        const zodError = result.error as ZodError;
        setAlert({
          status: "error",
          message: zodError.issues[0]?.message || "Validation error",
        });
      } else {
        setAlert({ status: "error", message: result.error });
      }
    }
  };

  return (
    <>
      {!showForm && (
        <>
          <Button
            color="primary"
            variant="contained"
            style={{ marginBlock: "15px" }}
            onClick={() => setShowForm(true)}
          >
            Add New Entry
          </Button>
        </>
      )}
      {alert.message && (
        <Alert
          style={{ marginBlock: "10px" }}
          variant="outlined"
          severity={alert.status}
        >
          {alert.message}
        </Alert>
      )}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            paddingBlock: "20px",
          }}
        >
          <TextField
            variant="standard"
            label="Description"
            required
            value={formData.description}
            onChange={({ target }) =>
              setFormData({ ...formData, description: target.value })
            }
          />
          <TextField
            variant="standard"
            type="date"
            label="date"
            required
            InputLabelProps={{ shrink: true }}
            onChange={({ target }) =>
              setFormData({ ...formData, date: target.value })
            }
          />
          <TextField
            variant="standard"
            required
            label="Specialist"
            value={formData.specialist}
            onChange={({ target }) =>
              setFormData({ ...formData, specialist: target.value })
            }
          />
          <TextField
            variant="standard"
            label="Diagnosis Codes"
            value={formData.diagnosisCodes.join(", ").toString()}
            onChange={({ target }) => {
              const newValue = target.value
                .split(", ")
                .map((code) => code.trim());

              setFormData({
                ...formData,
                diagnosisCodes: newValue,
              });
            }}
          />

          <InputLabel id="typeEntry">Type</InputLabel>
          <Select
            labelId="typeEntry"
            variant="standard"
            label="Type"
            value={formData.type}
            onChange={({ target }) =>
              setFormData({ ...formData, type: target.value as EntryType })
            }
            defaultValue={EntryType.HealthCheck}
          >
            {Object.values(EntryType).map((type, index) => (
              <MenuItem key={index} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
          {formData.type === EntryType.HealthCheck && (
            <>
              <InputLabel id="healthcheckrate">Health check rating</InputLabel>
              <Select
                labelId="healthcheckrate"
                variant="standard"
                value={formData.healthCheckRating}
                onChange={({ target }) =>
                  setFormData({
                    ...formData,
                    healthCheckRating: Number(target.value),
                  })
                }
              >
                {Object.values(HealthCheckRating)
                  .filter((val) => typeof val !== "string")
                  .map((rate, index) => (
                    <MenuItem key={index} value={rate}>
                      {rate}
                    </MenuItem>
                  ))}
              </Select>
            </>
          )}
          {formData.type === EntryType.OccupationalHealthcare && (
            <>
              <TextField
                variant="standard"
                label="Employer Name"
                onChange={({ target }) =>
                  setFormData({ ...formData, employerName: target.value })
                }
              />
              <InputLabel style={{ marginTop: "20px" }}>
                <strong>Sick Leave</strong>
              </InputLabel>
              <TextField
                variant="standard"
                type="date"
                label="start date"
                InputLabelProps={{ shrink: true }}
                value={formData?.sickLeave?.startDate}
                onChange={({ target }) =>
                  setFormData({
                    ...formData,
                    sickLeave: {
                      ...formData.sickLeave,
                      startDate: target.value,
                    },
                  })
                }
              />
              <TextField
                variant="standard"
                type="date"
                label="end date"
                InputLabelProps={{ shrink: true }}
                value={formData?.sickLeave?.endDate}
                onChange={({ target }) =>
                  setFormData({
                    ...formData,
                    sickLeave: {
                      ...formData.sickLeave,
                      endDate: target.value,
                    },
                  })
                }
              />
            </>
          )}
          {formData.type === EntryType.Hospital && (
            <>
              <InputLabel style={{ marginTop: "20px" }}>
                <strong>Discharge</strong>
              </InputLabel>
              <TextField
                variant="standard"
                type="date"
                label="date"
                InputLabelProps={{ shrink: true }}
                value={formData?.discharge?.date}
                onChange={({ target }) =>
                  setFormData({
                    ...formData,
                    discharge: {
                      ...formData.discharge,
                      date: target.value,
                    },
                  })
                }
              />
              <TextField
                variant="standard"
                label="Criteria"
                value={formData?.discharge?.criteria}
                onChange={({ target }) =>
                  setFormData({
                    ...formData,
                    discharge: {
                      ...formData.discharge,
                      criteria: target.value,
                    },
                  })
                }
              />
            </>
          )}
          <Stack direction="row" spacing={5}>
            <Button
              type="reset"
              onClick={(e) => {
                e.preventDefault();
                setShowForm(false);
              }}
              variant="contained"
              color="error"
              startIcon={<Close />}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="success"
              startIcon={<Add />}
            >
              Add
            </Button>
          </Stack>
        </form>
      )}
    </>
  );
};

export default NewEntryForm;
