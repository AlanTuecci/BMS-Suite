import React, { useEffect, useState } from "react";
import "./css/emptable.css";
import { onGetInvites } from "../api/auth";

function Emptable() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const { data } = await onGetInvites();
        setEmployees(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchEmployees();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container">
      <h2>Active Invites:</h2>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Invite Code</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.employee_email}>
              <td>{employee.employee_email}</td>
              <td>{employee.invite_code}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Emptable;
