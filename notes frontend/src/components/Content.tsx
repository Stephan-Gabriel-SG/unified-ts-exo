import {
  CoursePart,
  CoursePartBackground,
  CoursePartBasic,
  CoursePartGroup,
  CoursePartSpecial,
} from "../App";

const BackgroundContent = ({
  coursePart,
}: {
  coursePart: CoursePartBackground;
}) => {
  return (
    <>
      <p>
        {coursePart.description}
        <br />
        <em>{coursePart.backgroundMaterial}</em>
      </p>
    </>
  );
};

const GroupContent = ({ coursePart }: { coursePart: CoursePartGroup }) => {
  return (
    <>
      <p>project exercises : {coursePart.groupProjectCount}</p>
    </>
  );
};

const BasicContent = ({ coursePart }: { coursePart: CoursePartBasic }) => {
  return (
    <>
      <p>
        <em>{coursePart.description}</em>
      </p>
    </>
  );
};

const SpecialContent = ({ coursePart }: { coursePart: CoursePartSpecial }) => {
  return (
    <>
      <p>
        <em>{coursePart.description}</em>
        <br />
        required skills: {coursePart.requirements.join(", ")}
      </p>
    </>
  );
};

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <div>
      {courseParts.map((val, index) => (
        <div key={index}>
          <h3 style={{ paddingTop: "15px" }}>
            {val.name} {val.exerciseCount}
          </h3>
          <div>
            {val.kind === "background" && (
              <BackgroundContent coursePart={val} />
            )}
            {val.kind === "basic" && <BasicContent coursePart={val} />}
            {val.kind === "group" && <GroupContent coursePart={val} />}
            {val.kind === "special" && <SpecialContent coursePart={val} />}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Content;
