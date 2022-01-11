import PropTypes from "prop-types";
import React from "react";
import classNames from "classnames";
import { Leftarrow, Rightarrow } from "../assets/svgs/calendersvg";

import {
  daysOfWeek,
  createDaysForCurrentMonth,
  createDaysForNextMonth,
  createDaysForPreviousMonth,
  isWeekendDay,
  getMonthDropdownOptions,
  getYearDropdownOptions,
} from "./helpers";

let utc = new Date().toJSON().slice(0, 10).replace(/-/g, "-");
Calendar.propTypes = {
  className: PropTypes.string,
  yearAndMonth: PropTypes.arrayOf(PropTypes.number).isRequired, // e.g. [2021, 6] for June 2021
  onYearAndMonthChange: PropTypes.func.isRequired,
  renderDay: PropTypes.func,
};
export default function Calendar({
  //   className = "",
  yearAndMonth = [2021, 6],
  onYearAndMonthChange,
  renderDay = () => null,
}) {
  const [year, month] = yearAndMonth;

  let currentMonthDays = createDaysForCurrentMonth(year, month);
  let previousMonthDays = createDaysForPreviousMonth(
    year,
    month,
    currentMonthDays
  );
  let nextMonthDays = createDaysForNextMonth(year, month, currentMonthDays);
  let calendarGridDayObjects = [
    ...previousMonthDays,
    ...currentMonthDays,
    ...nextMonthDays,
  ];

  const handleMonthNavBackButtonClick = () => {
    let nextYear = year;
    let nextMonth = month - 1;
    if (nextMonth === 0) {
      nextMonth = 12;
      nextYear = year - 1;
    }
    onYearAndMonthChange([nextYear, nextMonth]);
  };

  const handleMonthNavForwardButtonClick = () => {
    let nextYear = year;
    let nextMonth = month + 1;
    if (nextMonth === 13) {
      nextMonth = 1;
      nextYear = year + 1;
    }
    onYearAndMonthChange([nextYear, nextMonth]);
  };

  const handleMonthSelect = (evt) => {
    let nextYear = year;
    let nextMonth = parseInt(evt.target.value, 10);
    onYearAndMonthChange([nextYear, nextMonth]);
  };

  const handleYearSelect = (evt) => {
    let nextMonth = month;
    let nextYear = parseInt(evt.target.value, 10);
    onYearAndMonthChange([nextYear, nextMonth]);
  };

  const TimeTable = () => {
    let timeAvailable = [
      "10:00am",
      "10:30am",
      "11:00am",
      "11:30am",
      "12:00pm",
      "01:00pm",
      "01:30pm",
      "02:00pm",
      "02:30pm",
      "03:00pm",
      "03:30pm",
      "04:00pm",
      "04:30pm",
    ];
    return (
      <div className="p-2 pl-0 pr-0">
        time and Date
        <div className="flex mr-10 flex-col  p-1 pt-0 mt-7 pb-2 content-center h-[400px] gap-3 overflow-y-scroll rounded-3xl custom-scroll">
          {timeAvailable.map((value, idx) => (
            <div
              className=" text-center p-2 mr-2 rounded-3xl bg-neutral-700 text-white "
              key={idx}
            >
              {value}
            </div>
          ))}
        </div>
      </div>
    );
  };
  return (
    <div className="date-time-container">
      <div className="calendar-root">
        <div className="navigation-header">
          <select
            className="month-select"
            value={month}
            onChange={handleMonthSelect}
          >
            {getMonthDropdownOptions().map(({ label, value }) => (
              <option value={value} key={value}>
                {label}
              </option>
            ))}
          </select>
          <select
            className="year-select"
            value={year}
            onChange={handleYearSelect}
          >
            {getYearDropdownOptions(year).map(({ label, value }) => (
              <option value={value} key={value}>
                {label}
              </option>
            ))}
          </select>
          <div className="month-nav-arrow-buttons">
            <button onClick={handleMonthNavBackButtonClick}>
              {" "}
              <Leftarrow />{" "}
            </button>
            <button onClick={handleMonthNavForwardButtonClick}>
              <Rightarrow />
            </button>
          </div>
        </div>
        <div className="days-of-week">
          {daysOfWeek.map((day, index) => (
            <div
              key={day}
              className={classNames("day-of-week-header-cell", {
                "weekend-day": [6, 0].includes(index),
              })}
            >
              {day}
            </div>
          ))}
        </div>
        <div className="days-grid">
          {calendarGridDayObjects.map((day) => (
            <div
              key={day.dateString}
              className={classNames("day-grid-item-container", {
                "weekend-day": isWeekendDay(day.dateString),
                "current-month": day.isCurrentMonth,
              })}
            >
              <div className="day-content-wrapper">{renderDay(day)}</div>
            </div>
          ))}
        </div>
      </div>
      <TimeTable />
    </div>
  );
}

CalendarDayHeader.propTypes = {
  calendarDayObject: PropTypes.object.isRequired,
};
export function CalendarDayHeader({ calendarDayObject }) {
  return (
    <div
      className="day-grid-item-header"
      style={
        calendarDayObject.dateString == utc
          ? { background: "snow", borderRadius: "100%", color: "black" }
          : {}
      }
    >
      {calendarDayObject.dayOfMonth}
    </div>
  );
}
