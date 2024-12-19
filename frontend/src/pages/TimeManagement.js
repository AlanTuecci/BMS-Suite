import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const TimeManagement = () => {
  const navigate = useNavigate();
  const today = new Date();
  const month = today.getMonth();
  const year = today.getFullYear();

  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const { authState } = useContext(AuthContext);
  const { userType } = authState;

  const [selectedDate, setSelectedDate] = useState("");
  const [shiftDays, setShiftDays] = useState([]);
  const [selectedShifts, setSelectedShifts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [totalHours, setTotalHours] = useState(0);
  const [workHours, setWorkHours] = useState(0);
  const [breakHours, setBreakHours] = useState(0);

  const jsDayToIndex = (jsDay) => (jsDay + 6) % 7;

  const generateCalendar = (year, month) => {
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
  };

  const calendarWeeks = generateCalendar(year, month);

  const fetchShiftDays = async () => {
    const apiUrl =
      userType === "employee"
        ? "/api/employee/getPastShifts"
        : "/api/company/getPastShifts";

    try {
      const response = await axios.post(
        apiUrl,
        { month_num: month + 1 },
        { withCredentials: true }
      );
      const shiftData = response.data;

      const shiftsGroupedByDay = shiftData.reduce((acc, shift) => {
        const day = new Date(shift.clock_in_timestamp).getDate();
        if (!acc[day]) acc[day] = [];
        acc[day].push(shift);
        return acc;
      }, {});

      let totalTime = 0;
      let totalWorkTime = 0;
      let totalBreakTime = 0;

      shiftData.forEach((shift) => {
        const clockIn = new Date(shift.clock_in_timestamp).getTime();
        const clockOut = new Date(shift.clock_out_timestamp).getTime();
        const breakStart = shift.break_start_timestamp
          ? new Date(shift.break_start_timestamp).getTime()
          : null;
        const breakEnd = shift.break_end_timestamp
          ? new Date(shift.break_end_timestamp).getTime()
          : null;

        if (clockOut > clockIn) {
          totalTime += clockOut - clockIn;

          if (breakStart && breakEnd && breakEnd > breakStart) {
            totalBreakTime += breakEnd - breakStart;
          }

          totalWorkTime += clockOut - clockIn - (breakEnd && breakStart ? breakEnd - breakStart : 0);
        }
      });

      setTotalHours((totalTime / (1000 * 60 * 60)).toFixed(2));
      setWorkHours((totalWorkTime / (1000 * 60 * 60)).toFixed(2));
      setBreakHours((totalBreakTime / (1000 * 60 * 60)).toFixed(2));

      setShiftDays(shiftsGroupedByDay);
    } catch (error) {
      console.error("Error fetching shifts:", error);
      setErrorMessage("Failed to load shifts. Try again later.");
    }
  };

  const fetchActiveShifts = async () => {
    if (userType !== "company") return;
    try {
      await axios.post(
        "/api/company/getActiveShifts",
        {},
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Error fetching active shifts:", error);
    }
  };

  const handleDayClick = (day) => {
    const selectedDateObj = new Date(year, month, day);
    const yearX = selectedDateObj.getFullYear();
    const monthX = (selectedDateObj.getMonth() + 1).toString().padStart(2, "0");
    const dayX = selectedDateObj.getDate().toString().padStart(2, "0");
    const formattedSelectedDate = `${yearX}-${monthX}-${dayX}`;

    const shiftsForDay = shiftDays[day];
    if (shiftsForDay) {
      setSelectedDate(formattedSelectedDate);
      const currentDate = today.toISOString().split("T")[0];
      const isToday = formattedSelectedDate === currentDate;

      if (userType === "company") {
        navigate("/employee-shifts", {
          state: { date: formattedSelectedDate, shifts: shiftsForDay, isToday },
        });
      } else {
        setSelectedShifts(shiftsForDay);
        setShowModal(true);
      }
    }
  };

  useEffect(() => {
    fetchShiftDays();
    fetchActiveShifts();
  }, [userType, month]);

  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      <div className="flex-grow p-8 ml-16">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900">Time Sheet</h1>
          <p className="text-gray-600">Log your hours for the work week</p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="flex flex-wrap justify-center gap-8">
            <div className="bg-white shadow-md rounded-xl p-6 text-center w-60">
              <p className="text-gray-600">Total Hours</p>
              <h2 className="text-xl font-bold text-compblue">{totalHours} hours</h2>
            </div>
            <div className="bg-white shadow-md rounded-xl p-6 text-center w-60">
              <p className="text-gray-600">Work Hours</p>
              <h2 className="text-xl font-bold text-compblue">{workHours} hours</h2>
            </div>
            <div className="bg-white shadow-md rounded-xl p-6 text-center w-60">
              <p className="text-gray-600">Break Hours</p>
              <h2 className="text-xl font-bold text-compblue">{breakHours} hours</h2>
            </div>
          </div>
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
                    const hasShift = shiftDays[day];
                    return (
                      <td
                        key={colIndex}
                        className={`border border-gray-200 text-center ${
                          day
                            ? hasShift
                              ? "bg-[#F0FAFC] hover:bg-[#e2f0f3]"
                              : isToday
                              ? "bg-[#F0FAFC]"
                              : "bg-white hover:bg-[#e2f0f3]"
                            : "bg-gray-100"
                        } transition cursor-pointer`}
                        onClick={() => day && hasShift && handleDayClick(day)}
                      >
                        {day || ""}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && selectedShifts.length > 0 && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Shift Details for {selectedDate}
            </h2>
            <div className="flex flex-col items-center">
              {selectedShifts.map((shift, index) => (
                <div key={index} className="mb-4 w-full">
                  <p className="text-center">
                    <strong>Clock In:</strong>{" "}
                    {new Date(shift.clock_in_timestamp).toLocaleTimeString()}
                  </p>
                  <p className="text-center">
                    <strong>Break Start:</strong>{" "}
                    {shift.break_start_timestamp
                      ? new Date(shift.break_start_timestamp).toLocaleTimeString()
                      : "N/A"}
                  </p>
                  <p className="text-center">
                    <strong>Break End:</strong>{" "}
                    {shift.break_end_timestamp
                      ? new Date(shift.break_end_timestamp).toLocaleTimeString()
                      : "N/A"}
                  </p>
                  <p className="text-center">
                    <strong>Clock Out:</strong>{" "}
                    {new Date(shift.clock_out_timestamp).toLocaleTimeString()}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-white text-compblue border-2 border-compblue rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeManagement;