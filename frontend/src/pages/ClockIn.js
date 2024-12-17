import React, { useState, useEffect } from "react";
import {
  onGetEmployeeIdsAndNames,
  onCheckEmployeePin,
  onClockIn,
  onBreakStart,
  onBreakEnd,
  onClockOut,
  onSignEmployeeOut,
} from "../api/auth";
import Sidebar from "../components/Sidebar";

const ClockIn = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [pin, setPin] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [pinError, setPinError] = useState(null);
  const [employeeState, setEmployeeState] = useState(null);

  const fetchEmployees = async () => {
    try {
      const response = await onGetEmployeeIdsAndNames();
      setEmployees(response.data);
      setFilteredEmployees(response.data);
    } catch (err) {
      setError("Failed to fetch employee data");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = employees.filter((employee) =>
      employee.full_name.toLowerCase().includes(term)
    );
    setFilteredEmployees(filtered);
  };

  const handleEmployeeClick = (employee) => {
    setSelectedEmployee(employee);
    setModalVisible(true);
    setPin("");
    setPinError(null);
    setEmployeeState(null);
  };

  const handlePinSubmit = async () => {
    const formattedPin = pin?.toString().trim();
    if (!formattedPin || formattedPin.length !== 4 || isNaN(formattedPin)) {
      setPinError("PIN must be exactly 4 digits.");
      return;
    }

    setModalLoading(true);
    setPinError(null);
    try {
      const payload = { employee_id: selectedEmployee.employee_id, pin: formattedPin };
      const response = await onCheckEmployeePin(payload);
      setEmployeeState(response.data);
    } catch (err) {
      setPinError(err.response?.data?.errors?.[0]?.msg || "Invalid PIN.");
    } finally {
      setModalLoading(false);
    }
  };

  const handleAction = async (action) => {
    try {
      const payload = { employee_id: selectedEmployee.employee_id };
      switch (action) {
        case "clock_in":
          await onClockIn(payload);
          break;
        case "break_start":
          await onBreakStart(payload);
          break;
        case "break_end":
          await onBreakEnd(payload);
          break;
        case "clock_out":
          await onClockOut(payload);
          break;
        case "sign_out":
          await onSignEmployeeOut(payload);
          break;
        default:
          throw new Error("Invalid action");
      }
      closeModal();
    } catch (err) {
      setPinError(`Failed to perform action: ${action.replace("_", " ")}`);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedEmployee(null);
    setEmployeeState(null);
    setPin("");
    setPinError(null);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      <div className="flex-grow p-8 ml-16">
        <h1 className="text-5xl font-light text-gray-800 mb-4 mt-4 leading-tight">
          Clock In
        </h1>
        <p className="text-gray-600 mb-6">Select an employee to clock in:</p>

        <div className="mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search Employees..."
            className="w-1/4 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-compblue focus:outline-none"
          />
        </div>

        <div className="font-mono text-gray-800">
          {filteredEmployees.map((employee, index) => (
            <div
              key={employee.employee_id}
              className={`mb-2 w-full flex items-center p-2 ${
                index % 2 === 1 ? "" : "bg-gray-100 rounded-md"
              }`}
              onClick={() => handleEmployeeClick(employee)}
            >
              <span className="w-1/2">#{employee.employee_id}</span>
              <span className="w-1/2">{employee.full_name}</span>
            </div>
          ))}
        </div>
      </div>

      {modalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">
              {selectedEmployee.full_name}
            </h2>
            {!employeeState ? (
              <>
                <p className="text-gray-600 mb-4">Enter your 4-digit PIN to authenticate.</p>
                <input
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="Enter PIN"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
                />
                {pinError && <p className="text-red-600">{pinError}</p>}
                <div className="flex justify-end gap-4">
                  <button onClick={closeModal} className="bg-white text-compblue border-2 border-compblue rounded-md px-4 py-2">
                    Cancel
                  </button>
                  <button
                    onClick={handlePinSubmit}
                    className="bg-compblue text-white rounded-md px-4 py-2"
                  >
                    Submit
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="text-gray-600 mb-4">
                  {employeeState.clocked_in
                    ? employeeState.on_break
                      ? "You are currently on a break."
                      : "You are clocked in."
                    : "You are not clocked in yet."}
                </p>
                <div className="flex flex-col gap-4">
                  {!employeeState.clocked_in && (
                    <button onClick={() => handleAction("clock_in")} className="bg-compblue hover:bg-lighter_purple rounded-md text-white p-2">
                      Clock In
                    </button>
                  )}
                  {employeeState.clocked_in && employeeState.on_break && (
                    <button onClick={() => handleAction("break_end")} className="bg-compblue hover:bg-lighter_purple rounded-md text-white p-2">
                      End Break
                    </button>
                  )}
                  {employeeState.clocked_in && !employeeState.on_break && !employeeState.had_break && (
                    <button onClick={() => handleAction("break_start")} className="bg-compblue hover:bg-lighter_purple rounded-md text-white p-2">
                      Start Break
                    </button>
                  )}
                  {employeeState.clocked_in && employeeState.had_break && !employeeState.on_break && (
                    <button onClick={() => handleAction("clock_out")} className="bg-compblue hover:bg-lighter_purple rounded-md text-white p-2">
                      Clock Out
                    </button>
                  )}
                  <button onClick={() => handleAction("sign_out")} className="bg-white text-compblue border-2 border-compblue rounded-md p-2">
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClockIn;