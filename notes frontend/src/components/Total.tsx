import { JSX } from "react/jsx-dev-runtime";

const Total = ({ totalExercises }: { totalExercises: number }): JSX.Element => {
  return (
    <div style={{ marginTop: "35px" }}>
      <p>
        Number of exercises <strong>{totalExercises}</strong>
      </p>
    </div>
  );
};

export default Total;
