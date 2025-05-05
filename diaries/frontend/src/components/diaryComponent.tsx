import { Diary } from "../services/types";

const DiaryComponent = ({ diary }: { diary: Diary }) => {
  return (
    <div>
      <h3>{diary.date}</h3>
      <ul>
        <li>
          <strong>visibility : </strong>
          {diary.visibility}
        </li>
        <li>
          <strong>weather : </strong>
          {diary.weather}
        </li>
      </ul>
    </div>
  );
};

export default DiaryComponent;
