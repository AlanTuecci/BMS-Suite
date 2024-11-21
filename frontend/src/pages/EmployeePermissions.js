import React, { useState, useEffect } from "react";
import {
  onGetEmployees,
  onSetMinCashAccessControl,
  onSetMinLaborAccessControl,
  onSetMinInventoryAccessControl,
} from "../api/auth";
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

  const [permissions, setPermissions] = useState({
    view: false,
    readAndInsert: false,
    readInsertUpdate: false,
    readInsertUpdateDelete: false,
  });

  const [feedbackMessage, setFeedbackMessage] = useState(null);

  const fetchEmployees = async () => {
    try {
      const response = await onGetEmployees();
      const employeeData = response.data.map((employee) => ({
        ...employee,
        employee_register_date: new Date(
          employee.employee_register_date,
        ).toLocaleDateString(),
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
      employee.full_name.toLowerCase().includes(term),
    );
    setFilteredEmployees(filtered);
  };

  const openModal = (employee) => {
    setSelectedEmployee(employee);
    setPermissions({
      view: false,
      readAndInsert: false,
      readInsertUpdate: false,
      readInsertUpdateDelete: false,
    });
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedEmployee(null);
    setFeedbackMessage(null);
  };

  const togglePermission = (key) => {
    setPermissions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const savePermissions = async () => {
    try {
      if (permissions.view) await onSetMinInventoryAccessControl();
      if (permissions.readAndInsert) await onSetMinLaborAccessControl();
      if (permissions.readInsertUpdate) await onSetMinCashAccessControl();

      setFeedbackMessage({ success: true, text: "Permissions updated successfully!" });
    } catch (error) {
      setFeedbackMessage({ success: false, text: "Failed to update permissions!" });
    }
  };

  if (loading)
    return <p className="text-center text-gray-600">Loading employees...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
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
        <h1 className="text-5xl font-light text-gray-800 mb-4 mt-4 leading-tight">
          Employee Permissions
        </h1>
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
                className="text-blue-600 ml-2 text-2xl hover:text-blue-800"
                onClick={() => openModal(employee)}
              >
                ⋮
              </button>
            </div>
          ))}
        </div>

        {isModalVisible && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-3xl p-8 shadow-lg w-[40rem] max-w-full">
              <h2 className="text-2xl font-semibold mb-6 text-center">
                User Permissions
              </h2>

              <div className="space-y-6">
                {[
                  {
                    key: "view",
                    title: "View",
                    description:
                      "Allows Viewing Data Only. No Modifications Are Permitted.",
                  },
                  {
                    key: "readAndInsert",
                    title: "Read And Insert",
                    description:
                      "Permits Viewing And Inserting Data, But No Updates Or Deletions.",
                  },
                  {
                    key: "readInsertUpdate",
                    title: "Read, Insert, And Update",
                    description:
                      "Grants Permissions For Viewing, Inserting, And Updating Data, But Not Deleting.",
                  },
                  {
                    key: "readInsertUpdateDelete",
                    title: "Read, Insert, Update And Delete",
                    description:
                      "Provides Full Access, Including Viewing, Inserting, Updating, And Deleting Data.",
                  },
                ].map((perm) => (
                  <div
                    key={perm.key}
                    className="flex justify-between items-center w-full p-3"
                  >
                    <div className="flex-grow">
                      <p className="font-semibold">{perm.title}</p>
                      <p className="text-sm text-gray-500">
                        {perm.description}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={permissions[perm.key]}
                        onChange={() => togglePermission(perm.key)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#454FE1] rounded-full peer peer-checked:bg-[#454FE1] peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                    </label>
                  </div>
                ))}
              </div>

              {feedbackMessage && (
                <p
                  className={`mt-4 text-center ${
                    feedbackMessage.success
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {feedbackMessage.text}
                </p>
              )}

              <div className="mt-6 flex justify-center gap-4">
                <button
                  className="px-6 py-2 bg-white text-[#454FE1] border-2 border-[#454FE1] rounded-lg hover:bg-gray-100"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button
                  className="px-6 py-2 bg-[#454FE1] text-white rounded-lg hover:bg-[#333ACC]"
                  onClick={savePermissions}
                >
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
