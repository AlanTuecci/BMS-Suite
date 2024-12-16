import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { onGetInvites, onInviteEmployee } from "../api/auth";

const Invite = () => {
  const [invites, setInvites] = useState([]);
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInvites = async () => {
      try {
        const { data } = await onGetInvites();
        setInvites(data);
      } catch (error) {
        setError("Failed to fetch invites");
      } finally {
        setLoading(false);
      }
    };

    fetchInvites();
  }, []);

  const handleInvite = async (e) => {
    e.preventDefault();
    try {
      const emailValue = {
        employee_email: email,
      };
      const { data } = await onInviteEmployee(emailValue);
      setErrors({});
      setSuccess(data.message);
      setEmail("");
      const invitesData = await onGetInvites();
      setInvites(invitesData.data);
    } catch (error) {
      const errorMsg =
        error.response && error.response.data && error.response.data.error
          ? error.response.data.error
          : "An error occurred";
      setErrors({ employee_email: errorMsg });
      setSuccess("");
    }
  };

  if (loading)
    return <p className="text-center text-gray-600">Loading invites...</p>;

  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      <div className="flex-grow p-8 ml-16">
        <h1 className="text-5xl font-light text-gray-800 mb-4 mt-4 leading-tight">
          Invite Users
        </h1>
        <p className="text-gray-600 mb-6">
          Invite new employees to join your company.
        </p>
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Send invite to email:</h3>
          <form onSubmit={handleInvite} className="flex">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter employee email"
              className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
            <button
              type="submit"
              className="px-6 py-2 bg-compblue text-white rounded-r-md hover:bg-blue-700"
            >
              Send Invite
            </button>
          </form>
          {errors.employee_email && (
            <div className="text-red-600 mt-2">{errors.employee_email}</div>
          )}
          {success && <div className="text-green-600 mt-2">{success}</div>}
        </div>
        <div className="font-mono text-gray-800">
          <div className="mb-4 w-full flex bg-gray-100 text-gray-800 rounded-lg p-3">
            <span className="w-1/2 font-semibold">Email</span>
            <span className="w-1/2 font-semibold">Invite Code</span>
          </div>

          {invites.map((invite, index) => (
            <div
              key={invite.employee_email}
              className={`mb-2 w-full flex items-center p-2 ${
                index % 2 === 0 ? "" : "bg-gray-100 rounded-md"
              }`}
            >
              <span className="w-1/2">{invite.employee_email}</span>
              <span className="w-1/2">{invite.invite_code}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Invite;
