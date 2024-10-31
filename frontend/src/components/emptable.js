
import React, { useEffect, useState } from 'react';
import './css/emptable.css';


function Emptable() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/company/getAllInvites'); 
                if (!response.ok) {
                    throw new Error('Network not working');
                }
                const data = await response.json();
                setEmployees(data); 
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Company ID</th>
                        <th>Email</th>
                        <th>Invite Code</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(employee => (
                        <tr key={employee.company_id}>
                            <td>{employee.company_id}</td>
                            <td>{employee.employee_email}</td>
                            <td>{employee.invite_code}</td> 
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Emptable
