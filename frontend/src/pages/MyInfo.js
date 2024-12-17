import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { onUpdatePin } from "../api/auth";

const MyInfo = () => {
  const { authState } = useContext(AuthContext);
  const [pin, setPin] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onChange = (e) => {
    setPin(e.target.value);
    setErrors({});
  };

  const onSubmit = async (e) => {
    e.preventDefault();
  
    if (pin.length !== 4 || isNaN(pin)) {
      setErrors({ pin: "PIN must be exactly 4 digits." });
      return;
    }
  
    try {
      setLoading(true);
      const payload = { pin };
      const response = await onUpdatePin(payload);
  
      if (response.data.success) {
        setSuccess("PIN updated successfully!");
        setErrors({});
      } else {
        setErrors({
          pin: response.data.message || "Failed to update PIN.",
        });
      }
    } catch (error) {
      setErrors({
        pin:
          error.response?.data?.errors?.[0]?.msg ||
          "Failed to update PIN. Try again.",
      });
    } finally {
      setLoading(false);
    }
  };  

  return (
    <div className="bg-white min-h-screen flex flex-col justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Update Your PIN
          </h1>
          <p className="text-gray-600 text-sm mt-2">
            Enter your secure 4-digit PIN below.
          </p>
        </div>
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="pin"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              New PIN
            </label>
            <input
              type="password"
              name="pin"
              maxLength={4}
              placeholder="Enter new 4-digit PIN"
              value={pin}
              onChange={onChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#454FE1] text-gray-700"
              required
            />
            {errors.pin && (
              <div className="text-red-600 text-sm mt-2">{errors.pin}</div>
            )}
          </div>
          {success && (
            <div className="text-green-600 text-sm text-center">{success}</div>
          )}
          <div>
            <button
              type="submit"
              className="w-full py-3 bg-[#14213D] text-white rounded-md font-semibold hover:bg-[#454FE1] transition duration-200"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update PIN"}
            </button>
          </div>
        </form>
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Back to{" "}
            <span
              onClick={() => navigate("/dashboard")}
              className="text-[#454FE1] font-semibold hover:underline cursor-pointer"
            >
              Dashboard
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyInfo;