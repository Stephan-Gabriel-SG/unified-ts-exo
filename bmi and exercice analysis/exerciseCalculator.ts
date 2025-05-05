import { isNumber } from "./utils";

interface exerciceResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface MultiplyValues {
  target: number;
  trainingDays: number[];
}

export const calculateExercices = (
  dailyExercices: number[],
  target: number
): exerciceResult => {
  const periodLength = dailyExercices.length;
  const average =
    dailyExercices.reduce((prev, cur) => prev + cur, 0) / periodLength;
  const trainingDays = dailyExercices.filter((hour) => hour > 0).length;
  const rating =
    trainingDays == periodLength && average == target
      ? 3
      : Math.abs(average - target) / 2 <= 1 &&
        Math.abs(trainingDays - periodLength) <= 2
      ? 2
      : 1;
  const ratingDescription =
    rating == 2
      ? "not too bad but could be better"
      : rating == 3
      ? "good, continue"
      : "bad, need improvement";
  return {
    periodLength: dailyExercices.length,
    trainingDays: dailyExercices.filter((hour) => hour > 0).length,
    success: trainingDays == periodLength && average == target,
    rating,
    ratingDescription,
    target,
    average,
  };
};

const parseArguments = (args: string[]): MultiplyValues => {
  if (args.length < 4) throw new Error("Not enough arguments");

  const target = args[2];
  const trainingDays = args.slice(3);

  if (!target || trainingDays.length == 0) {
    throw new Error("Must have at least two argument! ");
  }
  if (!isNumber(target)) {
    throw new Error("Error first argument,Target must be a number");
  }
  if (!trainingDays.every((arg) => isNumber(arg))) {
    throw new Error("Daily training hour must be a number");
  }
  return {
    trainingDays: trainingDays.map((val): number => Number(val)),
    target: Number(target),
  };
};

if (require.main === module) {
  try {
    const { target, trainingDays } = parseArguments(process.argv);
    console.log(calculateExercices(trainingDays, target));
  } catch (error: unknown) {
    let errorMessage = "Something bad happened.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
  }
}
