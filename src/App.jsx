import React, { useState } from "react";
import "./App.css";
import Calendar, { CalendarDayHeader } from "./components/calender";
import Login from "./components/Login";
function App() {
  const [yearAndMonth, setYearAndMonth] = useState([2021, 12]);
  return (
    <>
      <div className="w-20 h-screen fixed top-0 left-0 bg-neutral-700/50 flex items-center shadow-md  shadow-black/25">
        <div className="text-7xl text-center text-yellow-200/70 leading-[1.5]">
          M E E T E R
        </div>
      </div>
      <div className="bg-neutral-900 w-screen h-screen flex place-items-center place-content-center">
        <Login />
        {/* <Calendar
          yearAndMonth={yearAndMonth}
          onYearAndMonthChange={setYearAndMonth}
          renderDay={(calendarDayObject) => (
            <div>
              <CalendarDayHeader calendarDayObject={calendarDayObject} />
            </div>
          )}
        /> */}
      </div>
    </>
  );
}

export default App;
