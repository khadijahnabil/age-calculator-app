import { FormEvent, useState } from "react";
import "./App.css";
import {
  addMonths,
  addYears,
  differenceInDays,
  differenceInMonths,
  differenceInYears,
} from "date-fns";

interface dateDifferenceType {
  daysDifference: number;
  monthsDifference: number;
  yearsDifference: number;
}

function App() {
  const [dayInput, setDayInput] = useState<string>("");
  const [monthInput, setMonthInput] = useState<string>("");
  const [yearInput, setYearInput] = useState<string>("");
  const [dayError, setDayError] = useState<string>("");
  const [monthError, setMonthError] = useState<string>("");
  const [yearError, setYearError] = useState<string>("");
  const [dateError, setDateError] = useState<string>("");
  const [dateDifference, setDateDifference] = useState<dateDifferenceType>({
    daysDifference: 0,
    monthsDifference: 0,
    yearsDifference: 0,
  });

  // get current date
  const today = new Date();

  // validation for date
  const validateDayInput = (input: string) => {
    if (input === "") {
      setDayError("This field is required");
      return;
    }
    if (Number(input) < 1 || Number(input) > 31) {
      setDayError("Must be a valid day");
      return;
    }
    if (!Number(input)) {
      setDayError("Must be a number");
      return;
    }
    setDayError("");
  };

  const validateMonthInput = (input: string) => {
    if (input === "") {
      setMonthError("This field is required");
      return;
    }
    if (Number(input) < 1 || Number(input) > 12) {
      setMonthError("Must be a valid month");
      return;
    }
    if (!Number(input)) {
      setMonthError("Must be a number");
      return;
    }
    setMonthError("");
  };

  const validateYearInput = (input: string) => {
    const currentYear = new Date().getFullYear();
    if (input === "") {
      setYearError("This field is required");
      return;
    }
    if (Number(input) > currentYear) {
      setYearError("Must be in the past");
      return;
    }
    if (!Number(input)) {
      setYearError("Must be a number");
      return;
    }
    setYearError("");
  };

  function validateDateInput(
    dayInp: number,
    monthInp: number,
    yearInp: number
  ) {
    const d = new Date(yearInp, monthInp - 1, dayInp);
    if (
      d.getFullYear() === Number(yearInput) &&
      d.getMonth() + 1 === Number(monthInput) &&
      d.getDate() === Number(dayInput)
    ) {
      setDateError("");
      return true;
    }
    setDateError("Must be a valid date");
    return false;
  }

  // handle submit for date
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // make inputDate into javascript date
    const inputDate = new Date(
      Number(yearInput),
      Number(monthInput) - 1,
      Number(dayInput)
    );

    // make calculations for difference in dates
    const yearsDifference = differenceInYears(inputDate, today);
    const monthsDifference = differenceInMonths(
      inputDate,
      addYears(today, yearsDifference)
    );
    const exactDifferenceInMonths = differenceInMonths(inputDate, today);
    const daysDifference = differenceInDays(
      inputDate,
      addMonths(today, exactDifferenceInMonths)
    );

    const isDateValid = validateDateInput(
      Number(dayInput),
      Number(monthInput),
      Number(yearInput)
    );
    if (!isDateValid) {
      return;
    }
    // display results
    setDateDifference({
      daysDifference: daysDifference * -1,
      monthsDifference: monthsDifference * -1,
      yearsDifference: yearsDifference * -1,
    });
  };

  return (
    <main className='app'>
      <form
        className='flex flex-col'
        onSubmit={handleSubmit}
        onChange={() => setDateError("")}>
        <div className='flex flex-row gap-10'>
          <div
            className={
              dayError || (dateError && dayInput && monthInput && yearInput)
                ? "flex flex-col items-start gap-2 input-invalid"
                : "flex flex-col items-start gap-2"
            }>
            <label htmlFor='day'>DAY</label>
            <input
              type='text'
              name='day'
              id='day'
              placeholder='DD'
              onChange={(e) => {
                setDayInput(e.target.value);
                validateDayInput(e.target.value);
              }}
            />
            {dayError && <p className='input-invalid-text'>{dayError}</p>}
            {dateError && dayInput && monthInput && yearInput && (
              <p className='input-invalid-text'>{dateError}</p>
            )}
          </div>
          <div
            className={
              monthError || (dateError && dayInput && monthInput && yearInput)
                ? "flex flex-col items-start gap-2 input-invalid"
                : "flex flex-col items-start gap-2"
            }>
            <label htmlFor='month'>MONTH</label>
            <input
              type='text'
              name='month'
              id='month'
              placeholder='MM'
              onChange={(e) => {
                setMonthInput(e.target.value);
                validateMonthInput(e.target.value);
              }}
            />
            {monthError && <p className='input-invalid-text'>{monthError}</p>}
          </div>
          <div
            className={
              yearError || (dateError && dayInput && monthInput && yearInput)
                ? "flex flex-col items-start gap-2 input-invalid"
                : "flex flex-col items-start gap-2"
            }>
            <label htmlFor='year'>YEAR</label>
            <input
              type='text'
              name='year'
              id='year'
              placeholder='YYYY'
              onChange={(e) => {
                setYearInput(e.target.value);
                validateYearInput(e.target.value);
              }}
            />
            {yearError && <p className='input-invalid-text'>{yearError}</p>}
          </div>
        </div>
        <div className='flex items-center'>
          <hr />
          <button type='submit' className='submit-button'>
            <img
              src='../assets/images/icon-arrow.svg'
              alt='submit-button-icon'
              className='submit-button-icon'
            />
          </button>
        </div>
      </form>
      <div className='flex flex-col items-start'>
        <p>
          <span className='result'>
            {dateDifference.yearsDifference === 0
              ? "--"
              : dateDifference.yearsDifference}
          </span>{" "}
          years
        </p>
        <p>
          <span className='result'>
            {dateDifference.monthsDifference === 0
              ? "--"
              : dateDifference.monthsDifference}
          </span>{" "}
          months
        </p>
        <p>
          <span className='result'>
            {dateDifference.daysDifference === 0
              ? "--"
              : dateDifference.daysDifference}
          </span>{" "}
          days
        </p>
      </div>
    </main>
  );
}

export default App;
