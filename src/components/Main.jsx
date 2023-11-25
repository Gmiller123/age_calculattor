import React from "react";
import { useState } from "react";

const Main = () => {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [errors, setErrors] = useState({
    day: "",
    month: "",
    year: "",
  });

  const [age, setAge] = useState({
    years: "--",
    months: "--",
    days: "--",
  });

  const calculateAge = () => {
    const inputDate = new Date(`${month}/${day}/${year}`);
    const currentDate = new Date();

    if (isNaN(inputDate.getTime())) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        day: "Invalid date",
        month: "",
        year: "",
      }));
      return;
    }

    const ageInMillis = currentDate - inputDate;
    const ageDate = new Date(ageInMillis);

    const years = ageDate.getUTCFullYear() - 1970;
    const months = ageDate.getUTCMonth();
    const days = ageDate.getUTCDate() - 1;

    setAge({
      years: years,
      months: months,
      days: days,
    });

    setErrors({
      day: "",
      month: "",
      year: "",
    });
  };

  const handleDayChange = (e) => {
    const value = e.target.value;
    setDay(value);

    const isValid = /^\d+$/.test(value) && value >= 1 && value <= 31;
    setErrors((prevError) => ({
      ...prevError,
      day: isValid ? "" : "Invalid day",
    }));
  };

  const handleMonthChange = (e) => {
    const value = e.target.value;
    setMonth(value);

    const isValid = /^\d+$/.test(value) && value >= 1 && value <= 12;
    setErrors((prevErrors) => ({
      ...prevErrors,
      month: isValid ? "" : "Invalid month",
    }));
  };

  const handleYearChange = (e) => {
    const currentYear = new Date().getFullYear();

    const value = e.target.value;
    setYear(value);

    const isValid = /^\d{4}$/.test(value) && value <= currentYear;

    setErrors((prevErrors) => ({
      ...prevErrors,
      year: isValid ? "" : "Invalid year",
    }));
  };

  return (
    <div className="  flex flex-col items-center p-4 justify-center min-h-screen  bg-gray-200">
      <h1 className="text-center text-6xl font-extrabold tracking-widest text-[#7743DB]">
        Age Calculator
      </h1>
      <form
        className="relative outline-0 rounded-br-[200px] rounded-t-3xl rounded-bl-3xl p-20 max-md:p-6 mt-20 max-w-[1400px] bg-white"
        action=""
      >
        <div className="border-b-2 border-gray-300 p-4 flex flex-wrap gap-10 text-lg tracking-widest uppercase font-bold text-gray-500 pb-16">
          <div className="flex flex-col gap-2">
            <label htmlFor="">day</label>
            <input
              className={`border indent-4 border-gray-300 rounded-lg outline-0 w-40 h-20 max-md:flex-grow text-4xl ${
                errors.day && "border-red-500"
              }`}
              type="text"
              placeholder="DD"
              value={day}
              onChange={handleDayChange}
            />
            {errors.day && <p className="text-red-500">{errors.day}</p>}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="">month</label>
            <input
              className={`border indent-4 border-gray-300 rounded-lg outline-0 w-40 h-20 max-md:flex-grow text-4xl ${
                errors.month && "border-red-500"
              }`}
              type="text"
              placeholder="MM"
              value={month}
              onChange={handleMonthChange}
            />
            {errors.month && <p className="text-red-500">{errors.month}</p>}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="">year</label>
            <input
              className={`border indent-4 border-gray-300 rounded-lg outline-0 w-40 h-20 max-md:flex-grow text-4xl ${
                errors.year && "border-red-500"
              }`}
              type="text"
              placeholder="YYYY"
              value={year}
              onChange={handleYearChange}
            />
            {errors.year && <p className="text-red-500">{errors.year}</p>}
          </div>
        </div>
        <button
          className="cursor-pointer absolute z-10 bg-[#7743DB] rounded-xl text-white right-5 top-[245px] px-6 py-4 border border-gray-300 text-xl font-bold"
          type="button"
          onClick={calculateAge}
        >
          Calculate
        </button>
        <div className=" font-extrabold">
          <p className=" lg:text-[80px] md:text-[60px] max-sm:text-[40px]">
            {age.years} years
          </p>
          <p className=" lg:text-[80px] md:text-[60px] max-sm:text-[40px]">
            {age.months} months
          </p>
          <p className=" lg:text-[80px] md:text-[60px] max-sm:text-[40px]">
            {age.days} days
          </p>
        </div>
      </form>
    </div>
  );
};

export default Main;
