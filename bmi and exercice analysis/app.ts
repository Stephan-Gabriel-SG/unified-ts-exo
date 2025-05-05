import express from "express";
import calculateBMI from "./bmiCalculator";
import morgan from "morgan";
import { isNumber } from "./utils";
import { calculateExercices } from "./exerciseCalculator";
const app = express();
app.use(express.json());
app.use(morgan("tiny"));
app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!height || !weight) {
    res.status(401).json({ error: "malformatted parameters" });
  } else {
    const bmiResult = calculateBMI(height, weight);
    res.status(200).json({
      height,
      weight,
      bmi: bmiResult,
    });
  }
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  if (
    !daily_exercises ||
    !Array.isArray(daily_exercises) ||
    daily_exercises.length === 0 ||
    !daily_exercises.every((val) => isNumber(val)) ||
    !target ||
    !isNumber(target)
  ) {
    res.status(401).json({
      error: "malformatted parameters",
    });
    return;
  }

  res.status(201).json(
    calculateExercices(
      daily_exercises?.map((val: string) => Number(val)),
      Number(target)
    )
  );
});

export default app;
