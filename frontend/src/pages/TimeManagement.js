import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

const TimeManagement = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const today = new Date();
  const month = today.getMonth();
  const year = today.getFullYear();

  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentMonthName = monthNames[month];
  const currentYear = year;

  const jsDayToIndex = (jsDay) => (jsDay + 6) % 7;

  function generateCalendar(year, month) {
    const weeks = [];
    let week = [];

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const numberOfDaysInMonth = lastDayOfMonth.getDate();

    let date = 1;

    let jsDay = firstDayOfMonth.getDay();
    let dayIndex = jsDayToIndex(jsDay);

    for (let i = 0; i < 7; i++) {
      if (i < dayIndex) {
        week.push(null);
      } else {
        week.push(date);
        date++;
      }
    }
    weeks.push(week);

    while (date <= numberOfDaysInMonth) {
      week = [];
      for (let i = 0; i < 7; i++) {
        if (date <= numberOfDaysInMonth) {
          week.push(date);
          date++;
        } else {
          week.push(null);
        }
      }
      weeks.push(week);
    }

    return weeks;
  }

  const calendarWeeks = generateCalendar(year, month);

  function getWeekStartAndEnd(date) {
    const currentDate = new Date(date);
    const day = currentDate.getDay();
    const diffToMonday = (day + 6) % 7;

    const weekStart = new Date(currentDate);
    weekStart.setDate(currentDate.getDate() - diffToMonday);

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);

    return { weekStart, weekEnd };
  }

  const { weekStart, weekEnd } = getWeekStartAndEnd(today);

  return (
    <div className="flex min-h-screen bg-white">
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white transition-all duration-300 ${
          isSidebarOpen ? "w-64" : "w-16"
        }`}
      >
        <div className="p-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-white text-2xl"
          >
            {isSidebarOpen ? "Close" : "Open"}
          </button>
        </div>
        <Sidebar isSidebarOpen={isSidebarOpen} />
      </div>

      <div
        className={`flex-grow p-12 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-16"
        } flex flex-col`}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900">Time Sheet</h1>
          <p className="text-gray-600">Log your hours for the work week</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white shadow-md rounded-xl p-4 text-center">
            <p className="text-gray-600">Total Hours</p>
            <h2 className="text-xl font-bold text-[#454FE1]">250 hours</h2>
          </div>
          <div className="bg-white shadow-md rounded-xl p-4 text-center">
            <p className="text-gray-600">Total Work Hours</p>
            <h2 className="text-xl font-bold text-[#454FE1]">220 hours</h2>
          </div>
          <div className="bg-white shadow-md rounded-xl p-4 text-center">
            <p className="text-gray-600">Overtime Hours</p>
            <h2 className="text-xl font-bold text-[#454FE1]">5 hours</h2>
          </div>
          <div className="bg-white shadow-md rounded-xl p-4 text-center">
            <p className="text-gray-600">Total Paid Break Hours</p>
            <h2 className="text-xl font-bold text-[#454FE1]">12 hours</h2>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {currentMonthName} {currentYear}
            </h3>
            <p className="text-sm text-[#454FE1]">
              {weekStart.toLocaleDateString(undefined, {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}{" "}
              -{" "}
              {weekEnd.toLocaleDateString(undefined, {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
          <button className="bg-[#454FE1] text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700 transition">
            <span className="text-xl">+</span> Insert Time
          </button>
        </div>

        <div className="bg-white shadow-md rounded-xl overflow-hidden flex-grow">
          <table className="w-full text-left border-collapse h-full">
            <thead>
              <tr>
                {weekDays.map((day, index) => (
                  <th
                      key={index}
                      className="p-4 text-gray-600 border-b border-gray-200 font-medium text-center bg-[#F0FAFC]"
                    >
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {calendarWeeks.map((week, rowIndex) => (
                <tr key={rowIndex} className="h-24">
                  {week.map((day, colIndex) => {
                    const isToday =
                      day === today.getDate() &&
                      month === today.getMonth() &&
                      year === today.getFullYear();

                    return (
                      <td
                        key={colIndex}
                        className={`border border-gray-200 text-center ${
                          day
                            ? isToday
                              ? "bg-blue-100"
                              : "bg-white hover:bg-[#F0FAFC]"
                            : "bg-gray-100"
                        } transition`}
                      >
                        {day ? day : ""}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TimeManagement;