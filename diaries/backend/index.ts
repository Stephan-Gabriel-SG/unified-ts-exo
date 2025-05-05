import express from "express";
import diaryRouter from "./src/routes/diaries";
import morgan from "morgan";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(morgan("dev"));
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
const PORT = 3000;

app.get("/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.use("/api/diaries", diaryRouter);
app.listen(PORT, () => {
  console.log(`-  Server running on port ${PORT}`);
  console.log(`-  local : http://localhost:${PORT}`);
  console.log(`\n------------------------`);
});
