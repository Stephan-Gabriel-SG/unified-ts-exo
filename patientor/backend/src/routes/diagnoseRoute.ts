import express from "express";
import { getDiagnoses } from "../services/diagnoseServices";

const route = express.Router();

route.get("/", (_req, res) => {
  res.status(200).json(getDiagnoses());
});

export default route;
