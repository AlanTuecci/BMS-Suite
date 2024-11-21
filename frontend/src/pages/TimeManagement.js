import React from "react";
import Sidebar from '../components/Sidebar'

const TimeManagement = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-12">
      <Sidebar />
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900">Time Sheet</h1>
        <p className="text-gray-600">Log your hours for the work week</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white shadow-md rounded-xl p-4 text-center">
          <p className="text-gray-600">Total Hours</p>
          <h2 className="text-xl font-bold text-blue-600">250 hours</h2>
        </div>
        <div className="bg-white shadow-md rounded-xl p-4 text-center">
          <p className="text-gray-600">Total Work Hours</p>
          <h2 className="text-xl font-bold text-blue-600">220 hours</h2>
        </div>
        <div className="bg-white shadow-md rounded-xl p-4 text-center">
          <p className="text-gray-600">Overtime Hours</p>
          <h2 className="text-xl font-bold text-blue-600">5 hours</h2>
        </div>
        <div className="bg-white shadow-md rounded-xl p-4 text-center">
          <p className="text-gray-600">Total Paid Break Hours</p>
          <h2 className="text-xl font-bold text-blue-600">12 hours</h2>
        </div>
      </div>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">September 2024</h3>
          <p className="text-sm text-blue-600">September 10, 2024 - September 17, 2024</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700 transition">
          <span className="text-xl">+</span> Insert Time
        </button>
      </div>

      <div className="bg-white shadow-md rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
                <th
                  key={index}
                  className="p-4 text-gray-600 border-b border-gray-200 font-medium text-center"
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array(3)
              .fill(null)
              .map((_, rowIndex) => (
                <tr key={rowIndex}>
                  {Array(7)
                    .fill(null)
                    .map((_, colIndex) => (
                      <td
                        key={colIndex}
                        className="p-4 text-gray-600 border border-gray-200 text-center bg-gray-100"
                      ></td>
                    ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TimeManagement;