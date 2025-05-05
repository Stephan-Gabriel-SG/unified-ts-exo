import express from "express";
import diagnoseRoutes from "./src/routes/diagnoseRoute";
import patientRoutes from "./src/routes/patientRoute";
import morgan from "morgan";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.get("/api/ping", (_req, res) => {
  console.log("someone ping here");
  res.status(200).json({ success: true, message: "pong" });
});

app.use("/api/diagnoses", diagnoseRoutes);
app.use("/api/patients", patientRoutes);

export default app;
