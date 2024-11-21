import React, { useState, useEffect } from "react";
import { onGetEmployees } from "../api/auth";
import Sidebar from "../components/Sidebar";

const EmployeePermissions = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchEmployees = async () => {
    try {
      const response = await onGetEmployees();
      const employeeData = response.data.map((employee) => ({
        ...employee,
        employee_register_date: new Date(employee.employee_register_date).toLocaleDateString(),
      }));
      setEmployees(employeeData);
      setFilteredEmployees(employeeData);
    } catch (err) {
      console.error("Error fetching employees:", err);
      setError("Failed to fetch employee data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = employees.filter((employee) =>
      employee.full_name.toLowerCase().includes(term)
    );
    setFilteredEmployees(filtered);
  };

  const openModal = (employee) => {
    setSelectedEmployee(employee);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedEmployee(null);
  };

  if (loading)
    return <p className="text-center text-gray-600">Loading employees...</p>;
  if (error)
    return <p className="text-center text-red-500">{error}</p>;
  if (!employees.length)
    return <p className="text-center text-gray-600">No employees found.</p>;

  return (
    <div className="flex h-screen bg-white">
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
        className={`flex-grow p-8 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-16"
        }`}
      >
        <h1 className="text-3xl font-semibold text-gray-800">Employee Permissions</h1>
        <p className="text-gray-600 mb-6">Manage Employee Permissions Here</p>

        <div className="mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search Employees..."
            className="w-1/4 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="font-mono text-gray-800">
          <div className="mb-4 text-gray-800 w-full flex bg-gray-100 rounded-lg p-3">
            <span className="w-1/4 font-semibold">Employee ID</span>
            <span className="w-1/4 font-semibold">Employee Name</span>
            <span className="w-1/4 font-semibold">Email</span>
            <span className="w-1/4 font-semibold">Date Added</span>
          </div>

          {filteredEmployees.map((employee, index) => (
            <div
              key={employee.employee_id}
              className={`mb-2 w-full flex items-center p-2 ${
                index % 2 === 0 ? "" : "bg-gray-100 rounded-md"
              }`}
            >
              <span className="w-1/4">#{employee.employee_id}</span>
              <span className="w-1/4">{employee.full_name}</span>
              <span className="w-1/4">{employee.employee_email}</span>
              <span className="w-1/4">{employee.employee_register_date}</span>
              <button
                className="text-blue-500 ml-2"
                onClick={() => openModal(employee)}
              >
                ⋮
              </button>
            </div>
          ))}
        </div>

        {isModalVisible && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 shadow-lg w-96">
              <h2 className="text-xl font-semibold mb-4">User Permissions</h2>
              <p className="mb-6">
                Managing permissions for:{" "}
                <span className="font-bold">{selectedEmployee?.full_name}</span>
              </p>
              <div className="space-y-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2 text-blue-500 focus:ring-blue-500"
                  />
                  View
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2 text-blue-500 focus:ring-blue-500"
                  />
                  Read And Insert
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2 text-blue-500 focus:ring-blue-500"
                  />
                  Read, Insert, And Update
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2 text-blue-500 focus:ring-blue-500"
                  />
                  Read, Insert, Update, And Delete
                </label>
              </div>
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeePermissions;
