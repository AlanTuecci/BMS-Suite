import React, { useState, useEffect } from "react";
import {
  onGetEmployees,
  onGetInventoryAccessControlById,
  onGetLaborAccessControlById,
  onGetCashAccessControlById,
  onAssignInventoryAccessControl,
  onAssignLaborAccessControl,
  onAssignCashAccessControl,
} from "../api/auth";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

const EmployeePermissions = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalLoading, setModalLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [permissions, setPermissions] = useState({
    inventory: 0,
    labor: 0,
    cash: 0,
  });
  const [feedbackMessage, setFeedbackMessage] = useState(null);
  const navigate = useNavigate();

  const fetchEmployees = async () => {
    try {
      const response = await onGetEmployees();
      const employeeData = response.data.map((employee) => ({
        ...employee,
        employee_register_date: new Date(employee.employee_register_timestamp).toLocaleDateString(),
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

  const fetchEmployeePermissions = async (employee_id) => {
    try {
      setModalLoading(true);

      const [inventoryResponse, laborResponse, cashResponse] = await Promise.all([
        onGetInventoryAccessControlById(employee_id),
        onGetLaborAccessControlById(employee_id),
        onGetCashAccessControlById(employee_id),
      ]);

      const inventoryPerm = inventoryResponse.data[0]?.access_control_level || 0;
      const laborPerm = laborResponse.data[0]?.access_control_level || 0;
      const cashPerm = cashResponse.data[0]?.access_control_level || 0;

      setPermissions({
        inventory: inventoryPerm,
        labor: laborPerm,
        cash: cashPerm,
      });
    } catch (error) {
      console.error("Error fetching permissions:", error);
      setPermissions({
        inventory: 0,
        labor: 0,
        cash: 0,
      });
    } finally {
      setModalLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = employees.filter((employee) => employee.full_name.toLowerCase().includes(term));
    setFilteredEmployees(filtered);
  };

  const openModal = async (employee) => {
    setSelectedEmployee(employee);
    await fetchEmployeePermissions(employee.employee_id);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedEmployee(null);
    setPermissions({
      inventory: 0,
      labor: 0,
      cash: 0,
    });
    setFeedbackMessage(null);
  };

  const handlePermissionChange = (section, level) => {
    setPermissions((prevPermissions) => ({
      ...prevPermissions,
      [section]: level,
    }));
  };

  const savePermissions = async () => {
    try {
      const assignFunctions = {
        inventory: onAssignInventoryAccessControl,
        labor: onAssignLaborAccessControl,
        cash: onAssignCashAccessControl,
      };

      await Promise.all(
        Object.keys(permissions).map(async (section) => {
          const assignFunction = assignFunctions[section];
          const accessControlLevel = permissions[section];

          await assignFunction({
            employee_id: selectedEmployee.employee_id,
            access_control_level: accessControlLevel,
          });
        })
      );

      setFeedbackMessage({
        success: true,
        text: "Permissions updated successfully!",
      });
    } catch (error) {
      console.error("Error updating permissions:", error);
      setFeedbackMessage({
        success: false,
        text: "Failed to update permissions!",
      });
    }
  };

  const permissionLevels = [
    { level: 0, label: "Read" },
    { level: 1, label: "Record" },
    { level: 2, label: "Update" },
    { level: 3, label: "Delete" },
  ];

  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      <div className="flex-grow p-8 ml-16">
        <h1 className="text-5xl font-light text-gray-800 mb-4 mt-4 leading-tight">Employee Permissions</h1>
        <p className="text-gray-600 mb-6">Manage Employee Permissions Here</p>

        <div className="mb-6 flex items-center gap-4">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search Employees..."
            className="w-1/4 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-compblue focus:outline-none"
          />

          <button
            className="bg-compblue text-white px-4 py-2 rounded-lg hover:bg-lighter_purple"
            onClick={() => navigate("/bms-suite/invite")}
          >
            + Invite Employee
          </button>
        </div>

        {loading && <p className="text-center text-gray-600 mb-4">Loading employees...</p>}
        {error && <p className="text-center text-red-500 mb-4">{error}</p>}

        <div className="font-mono text-gray-800">
          <div className="mb-4 text-gray-800 w-full flex bg-gray-100 rounded-lg p-3">
            <span className="w-1/4 font-semibold">Employee ID</span>
            <span className="w-1/4 font-semibold">Employee Name</span>
            <span className="w-1/4 font-semibold">Email</span>
            <span className="w-1/4 font-semibold">Date Added</span>
          </div>

          {filteredEmployees.length === 0 && !loading && !error && (
            <p className="text-center text-gray-600 mt-4">No employees found.</p>
          )}

          {filteredEmployees.map((employee, index) => (
            <div
              key={employee.employee_id}
              className={`mb-2 w-full flex items-center p-2 ${index % 2 === 0 ? "" : "bg-gray-100 rounded-md"}`}
            >
              <span className="w-1/4">#{employee.employee_id}</span>
              <span className="w-1/4">{employee.full_name}</span>
              <span className="w-1/4">{employee.employee_email}</span>
              <span className="w-1/4">{employee.employee_register_date}</span>
              <button className="text-blue-600 ml-2 text-2xl hover:text-blue-800" onClick={() => openModal(employee)}>
                ⋮
              </button>
            </div>
          ))}
        </div>

        {isModalVisible && selectedEmployee && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-3xl p-6 w-full max-w-3xl">
              <h2 className="text-2xl font-semibold mb-6 text-center">Permissions for {selectedEmployee.full_name}</h2>

              {modalLoading ? (
                <p className="text-center text-gray-600">Loading permissions...</p>
              ) : (
                <>
                  <div className="flex flex-col space-y-4">
                    {["inventory", "labor", "cash"].map((section) => (
                      <div key={section} className="flex flex-col">
                        <div className="flex items-center justify-between p-3 bg-gray-100 text-gray-800 rounded-lg">
                          <h3 className="text-lg font-medium capitalize">{section}</h3>
                        </div>

                        <div className="flex justify-between items-center mt-2">
                          {permissionLevels.map((level) => (
                            <label key={level.level} className="flex flex-col items-center w-1/4 cursor-pointer">
                              <input
                                type="radio"
                                name={section}
                                value={level.level}
                                checked={permissions[section] === level.level}
                                onChange={() => handlePermissionChange(section, level.level)}
                                className="form-radio text-blue-600"
                              />
                              <span className="mt-1 text-gray-600 text-sm">{level.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {feedbackMessage && (
                    <p className={`mt-4 text-center ${feedbackMessage.success ? "text-green-600" : "text-red-600"}`}>
                      {feedbackMessage.text}
                    </p>
                  )}

                  <div className="mt-6 flex justify-center gap-4">
                    <button
                      className="px-4 py-2 bg-white text-compblue border border-compblue rounded-lg hover:bg-gray-100"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-4 py-2 bg-compblue text-white rounded-lg hover:bg-blue-700"
                      onClick={savePermissions}
                    >
                      Save Changes
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeePermissions;
