import { Dispatch, SetStateAction, useState } from "react";
import { Diary, NewDiary, Visibility, Weather } from "../services/types";
import { addDiary } from "../services/diaryService";
import axios from "axios";

const visibilities = Object.values(Visibility);
const weathers = Object.values(Weather);
const initNewDiaryValue = {
  date: "",
  weather: weathers[0],
  visibility: visibilities[0],
  comment: "",
};
const NewDiaryForm = ({
  setDiaries,
}: {
  setDiaries: Dispatch<SetStateAction<Diary[]>>;
}) => {
  const [newDiary, setNewDiary] = useState<NewDiary>(initNewDiaryValue);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [successMessage, setSuccessMessage] = useState<string>();

  const handleAddNewDiary = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const response = await addDiary(newDiary);
      setDiaries((old: Diary[]) => [...old, response]);
      setNewDiary(initNewDiaryValue);
      setSuccessMessage(`diary added - ${response.date}`);
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        setErrorMessage(e.message);
      }
      setErrorMessage("something went wrong during data fetch");
    }
  };

  return (
    <form onSubmit={handleAddNewDiary}>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <div>
        <label htmlFor="diaryDate">Date</label>
        <input
          type="date"
          id="diaryDate"
          required
          onChange={({ target }) =>
            setNewDiary({ ...newDiary, date: target.value })
          }
        />
      </div>
      <div>
        <label htmlFor="visibility">Visibility</label>
        <select
          id="visibility"
          defaultValue={newDiary.visibility}
          onChange={({ target }) =>
            setNewDiary({ ...newDiary, visibility: target.value as Visibility })
          }
          required
        >
          {visibilities.map((visibility, index) => (
            <option key={index} value={visibility}>
              {visibility}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="weather">Weather</label>
        <select
          id="weather"
          defaultValue={newDiary.weather}
          onChange={({ target }) =>
            setNewDiary({ ...newDiary, weather: target.value as Weather })
          }
          required
        >
          {weathers.map((weather, index) => (
            <option key={index} value={weather}>
              {weather}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="comment">Comment</label>
        <input
          id="comment"
          value={newDiary.comment}
          onChange={({ target }) =>
            setNewDiary({ ...newDiary, comment: target.value })
          }
        />
      </div>
      <button type="submit">add</button>
    </form>
  );
};

export default NewDiaryForm;
