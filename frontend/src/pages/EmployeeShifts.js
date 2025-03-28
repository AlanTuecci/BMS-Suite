import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { onGetAllPastShifts, onGetAllActiveShifts } from "../api/auth";

const EmployeeShifts = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { date: selectedDate } = location.state || {};

  const [shiftData, setShiftData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isActiveShifts, setIsActiveShifts] = useState(false);
  const [isToday, setIsToday] = useState(false);

  useEffect(() => {
    const today = new Date();
    today.setDate(today.getDate());
    const formattedToday = today.toISOString().split("T")[0];
    setIsToday(formattedToday === selectedDate);
    fetchShifts();
  }, [selectedDate, isActiveShifts]);

  const fetchShifts = async () => {
    try {
      const response =
        isToday && isActiveShifts
          ? await onGetAllActiveShifts()
          : await onGetAllPastShifts(new Date(selectedDate).getMonth() + 1);

      const filteredData = response.data.filter((shift) => {
        const shiftDate = new Date(shift.clock_in_timestamp).toLocaleDateString().split("T")[0];

        const parseLocaleDateString = (dateString) => {
          const [month, day, year] = dateString.split("/");
          return new Date(`${year}-${month}-${day}`);
        };

        const parsedDate = parseLocaleDateString(shiftDate);

        const isoString = parsedDate.toISOString().split("T")[0];

        return isoString === selectedDate;
      });

      setShiftData(filteredData);
    } catch (error) {
      console.error("Error fetching shifts:", error);
      setErrorMessage("Failed to load shifts. Try again later.");
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const toggleShiftType = (shiftType) => {
    setIsActiveShifts(shiftType === "active");
  };

  const filteredShifts = shiftData.filter((shift) => shift.employee_id.toString().includes(searchTerm));

  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      <div className="flex-grow p-8 ml-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-5xl font-light text-gray-800 mb-2 leading-tight">Employee Shifts for {selectedDate}</h1>
            <p className="text-gray-600">Manage Employee Shifts Here</p>
          </div>
          <button
            className="bg-white text-compblue border border-compblue px-4 py-2 rounded-lg hover:bg-gray-100 focus:outline-none"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>

        {isToday && (
          <div className="mb-6 flex items-center gap-4">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search Employees by ID..."
              className="w-1/4 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-compblue focus:outline-none"
            />

            <button
              className={`px-4 py-2 rounded-lg border focus:outline-none ${
                isActiveShifts
                  ? "bg-compblue text-white border-compblue"
                  : "bg-white text-compblue border-compblue hover:bg-gray-100"
              }`}
              disabled={isActiveShifts}
              onClick={() => toggleShiftType("active")}
            >
              View Active Shifts
            </button>
            <button
              className={`px-4 py-2 rounded-lg border focus:outline-none ${
                !isActiveShifts
                  ? "bg-compblue text-white border-compblue"
                  : "bg-white text-compblue border-compblue hover:bg-gray-100"
              }`}
              disabled={!isActiveShifts}
              onClick={() => toggleShiftType("past")}
            >
              View Past Shifts
            </button>
          </div>
        )}

        {errorMessage && <p className="text-red-600 mb-4 text-center">{errorMessage}</p>}

        <div className="font-mono text-gray-800">
          <div className="mb-4 text-gray-800 w-full flex bg-gray-100 rounded-lg p-3">
            <span className="w-1/6 font-semibold">Employee ID</span>
            <span className="w-1/6 font-semibold">Shift ID</span>
            <span className="w-1/6 font-semibold">Clock In</span>
            <span className="w-1/6 font-semibold">Break Start</span>
            <span className="w-1/6 font-semibold">Break End</span>
            <span className="w-1/6 font-semibold">Clock Out</span>
          </div>

          {filteredShifts.map((shift, index) => (
            <div
              key={shift.shift_id}
              className={`mb-2 w-full flex items-center p-2 ${index % 2 === 0 ? "" : "bg-gray-100 rounded-md"}`}
            >
              <span className="w-1/6">{shift.employee_id}</span>
              <span className="w-1/6">{shift.shift_id}</span>
              <span className="w-1/6">{new Date(shift.clock_in_timestamp).toLocaleTimeString()}</span>
              <span className="w-1/6">
                {shift.break_start_timestamp ? new Date(shift.break_start_timestamp).toLocaleTimeString() : "N/A"}
              </span>
              <span className="w-1/6">
                {shift.break_end_timestamp ? new Date(shift.break_end_timestamp).toLocaleTimeString() : "N/A"}
              </span>
              <span className="w-1/6">
                {shift.clock_out_timestamp ? new Date(shift.clock_out_timestamp).toLocaleTimeString() : "N/A"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployeeShifts;
