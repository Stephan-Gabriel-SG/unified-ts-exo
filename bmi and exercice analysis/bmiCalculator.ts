import { isNumber } from "./utils";

const calculateBMI = (height: number, weight: number): string => {
  const BMI = weight / Math.pow(height / 100, 2);
  if (BMI < 18.5) return "Underweight ";
  else if (BMI < 24.9) return "Normal range";
  else if (BMI < 29.9) return "Overweight";
  else return "Obese";
};

interface TwoValue {
  height: number;
  weight: number;
}

const parseArguments = (args: string[]): TwoValue => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");
  const height = args[2];
  const weight = args[3];
  if (!isNumber(height)) {
    throw new Error("invalid height, it must be a number");
  }
  if (!isNumber(weight)) {
    throw new Error("invalid weight, it must be a number");
  }
  return {
    height: Number(height),
    weight: Number(weight),
  };
};

if (require.main == module) {
  try {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBMI(height, weight));
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += ` Error ${error.message}`;
    }
    console.log(errorMessage);
  }
}

export default calculateBMI;
