import { useParams } from "react-router-dom";
import {
  Diagnosis,
  Patient,
  EntryType,
  EntryWithoutId,
  HealthCheckRating,
} from "../../types";
import { useEffect, useState } from "react";
import patientServices from "../../services/patients";
import diagnoseServices from "../../services/diagnoses";

import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import {
  Male,
  Female,
  BadgeRounded,
  FavoriteRounded,
} from "@mui/icons-material";
import { red } from "@mui/material/colors";
import NewEntryForm from "./AddNewEntry";

const EntryOtherDetail = ({ entry }: { entry: EntryWithoutId }) => {
  switch (entry.type) {
    case EntryType.HealthCheck:
      const colorHeartStatus = ["green", "yellow", "orange", "red"];
      const titleHeartStatus = Object.keys(HealthCheckRating).filter((key) =>
        isNaN(Number(key))
      );

      return (
        <>
          <Stack direction={"row"} spacing={2} justifyItems={"center"}>
            <FavoriteRounded
              style={{ color: colorHeartStatus[entry.healthCheckRating] }}
            />
            <em>{titleHeartStatus[entry.healthCheckRating]?.toLowerCase()}</em>
          </Stack>
        </>
      );
    case EntryType.OccupationalHealthcare:
      return (
        <>
          <Stack direction={"row"} spacing={2} justifyItems={"center"}>
            <BadgeRounded color="primary" fontSize="medium" />
            <h3>{entry.employerName}</h3>
          </Stack>
          <h4 style={{ marginBottom: 0 }}>sick leave</h4>
          {entry.sickLeave &&
          entry.sickLeave.startDate &&
          entry.sickLeave.endDate ? (
            <p style={{ marginLeft: "1.5rem", marginBlock: "0" }}>
              start date: {entry?.sickLeave?.startDate}
              <br />
              end date : {entry?.sickLeave?.endDate}
            </p>
          ) : (
            <p style={{ marginLeft: "1.5rem", marginBlock: "0" }}>None</p>
          )}
        </>
      );
    case EntryType.Hospital:
      return (
        <>
          <h4 style={{ marginBottom: 0 }}>discharge</h4>
          <p style={{ marginLeft: "1.5rem", marginBlock: "0" }}>
            date : {entry.discharge.date}
            <br />
            criteria : {entry.discharge.criteria}
          </p>
        </>
      );
  }
};

const PatientInformation = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      if (typeof id == "string") {
        setPatient(await patientServices.getById(id));
      }
    };
    const fetchDiagnoseData = async () => {
      setDiagnoses(await diagnoseServices.getAll());
    };
    fetchDiagnoseData();
    fetchData();
  }, [id]);

  if (!patient) {
    return (
      <Typography variant="subtitle1" color={red[600]}>
        Patient not found
      </Typography>
    );
  }

  return (
    <div>
      <Divider style={{ marginBlock: "1.5rem" }} />
      <Typography variant="h4">
        {patient.name}{" "}
        {patient.gender === "male" ? (
          <Male fontSize="medium" />
        ) : patient.gender === "female" ? (
          <Female fontSize="medium" />
        ) : (
          ""
        )}
      </Typography>
      <Typography>
        ssn : {patient.ssn}
        <br />
        ocupation : {patient.occupation}
      </Typography>
      <Typography variant="h5" style={{ marginTop: ".5rem" }}>
        Entries
      </Typography>
      <NewEntryForm
        id={patient.id}
        setPatient={setPatient as React.Dispatch<React.SetStateAction<Patient>>}
      />
      <Typography component="div">
        {patient.entries.length == 0 && (
          <p style={{ marginLeft: "1.5rem", marginBlock: "0" }}>None</p>
        )}
        {patient.entries.map((entry, i) => {
          return (
            <Card key={i} style={{ marginBlock: "10px" }} variant="outlined">
              <CardHeader title={entry.date} />
              <CardContent>
                <em> {entry.description}</em>
                <ul>
                  {entry.diagnosisCodes?.map((code, index) => (
                    <li key={index}>
                      {code} :{" "}
                      {diagnoses.find((d) => d.code === code)?.name ||
                        "no description"}
                    </li>
                  ))}
                </ul>
                <EntryOtherDetail entry={entry} />
                <p>
                  <em>diagnose by {entry.specialist}</em>
                </p>
              </CardContent>
            </Card>
          );
        })}
      </Typography>
    </div>
  );
};

export default PatientInformation;
