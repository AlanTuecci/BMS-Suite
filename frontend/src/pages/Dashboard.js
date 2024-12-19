import React, { useContext, useState } from "react";

import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import DashboardCard from "../components/DashboardCard";
import { AuthContext } from "../context/AuthContext";
import { onTimeLogin } from "../api/auth";
import { useNavigate } from "react-router-dom";
import personIcon from "../media/dashboard/person_24dp_14213D_FILL0_wght400_GRAD0_opsz24.svg";
import groupIcon from "../media/dashboard/group_24dp_14213D_FILL0_wght400_GRAD0_opsz24.svg";
import cashIcon from "../media/dashboard/payments_24dp_14213D_FILL0_wght400_GRAD0_opsz24.svg";
import binIcon from "../media/dashboard/inventory_2_24dp_14213D_FILL0_wght400_GRAD0_opsz24.svg";
import timeIcon from "../media/dashboard/work_history_24dp_14213D_FILL0_wght400_GRAD0_opsz24.svg";
import CalcIcon from "../media/sidebar/Calc.svg"
import MoneyIcon from "../media/sidebar/Money.svg"

function Dashboard() {
  const { authState } = useContext(AuthContext);
  const { userType } = authState;
  const navigate = useNavigate();

  const [showTimeLoginModal, setShowTimeLoginModal] = useState(false);
  const [showCashModal, setCashModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const companyCards = [
    {
      title: "Clock In",
      description: "Log your hours for the work week.",
      link: "clock-in",
      photo: timeIcon,
      onClick: () => setShowTimeLoginModal(true),
    },
    {
      title: "Inventory Summary",
      description: "Manage and update your inventory.",
      link: "inventory-summary",
      photo: binIcon,
    },
    {
      title: "Cash Control",
      description: "Monitor and manage your revenue stream.",
      link: "cash-control",
      photo: cashIcon,
      onClick: () => setCashModal(true),
    },
    {
      title: "Manage Employees",
      description: "Oversee and manage employee information.",
      link: "employee-permissions",
      photo: groupIcon,
    },
    {
      title: "About Us",
      description: "An about us page.",
      link: "about-us",
      photo: personIcon,
    },
  ];

  const employeeCards = [
    {
      title: "Time Management",
      description: "Track your hours for the work week.",
      link: "time-management",
      photo: timeIcon,
    },
    {
      title: "Inventory Summary",
      description: "Manage and update your inventory.",
      link: "inventory-summary",
      photo: binIcon,
    },
    {
      title: "Cash Control",
      description: "Monitor and manage your revenue stream.",
      link: "cash-control",
      photo: cashIcon,
    },
    {
      title: "My Info",
      description: "View and update your personal information.",
      link: "my-info",
      photo: personIcon,
    },
    {
      title: "About Us",
      description: "An about us page.",
      link: "about-us",
      photo: personIcon,
    },
  ];

  const cardsToDisplay = userType === "company" ? companyCards : employeeCards;
  const handleTimeLogin = async () => {
    if (!email || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }
  
    setLoading(true);
    setErrorMessage("");
  
    try {
      const loginData = { email, password };
      const response = await onTimeLogin(loginData, navigate);
  
      if (response.data.success) {
        setShowTimeLoginModal(false);
        navigate("/clock-in");
        window.location.reload();
      } else {
        setErrorMessage(response.data.message || "Login failed. Try again.");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.errors?.[0]?.msg || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-bkgdb overflow-x-auto relative">
      <Sidebar />
      <div className="relative flex flex-col items-center justify-center flex-grow p-4">
        <div className="items-start justify-start text-center mb-4 md:mb-8 mt-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[#14213D]">Hello</h2>
          <p className="text-sm md:text-lg text-gray-600">{formattedDate}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full max-w-screen-xl">
          {cardsToDisplay.map((card) => (
            <DashboardCard
              key={card.title}
              title={card.title}
              description={card.description}
              link={card.link}
              photo={card.photo}
              onClick={card.onClick}
            />
          ))}
        </div>
      </div>

      {showTimeLoginModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Clock In</h2>
            <p className="text-gray-700 mb-4">Enter your email and password to log in:</p>

            <div className="mb-4">
              <label className="block text-gray-600 mb-2">Email:</label>
              <input
                type="email"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 mb-2">Password:</label>
              <input
                type="password"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {loading ? (
              <p className="text-center text-gray-600">Processing...</p>
            ) : errorMessage ? (
              <p className="text-center text-red-600 mb-4">{errorMessage}</p>
            ) : null}

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowTimeLoginModal(false)}
                className="px-4 py-2 bg-white text-compblue border-2 border-compblue rounded-md"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handleTimeLogin}
                className="px-4 py-2 bg-compblue text-white rounded-md hover:bg-lighter_purple"
                disabled={loading}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}

      {showCashModal && (
        <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className=" flex bg-bkgd rounded-2xl text-center p-8 md:p-12 shadow-md z-[11] relative">
                <button className="absolute top-3 right-5 text-blue_txt_color hover:text-gray text-2xl" onClick={() => setCashModal(false)}>
                    &times;
                </button>
                <div className="flex gap-7">
                    
                <Link to="/count">
                    <div className="flex flex-col justify-center cursor-pointer w-40 h-40 p-9 bg-another_purple text-blue_txt_color rounded-xl shadow-md hover:shadow-lg ease-in-out duration-300"
                        onClick={() => setCashModal(false)}
                        >
                            <img src={CalcIcon}></img>
                            <h3 className="font-semibold">Safe Counts</h3>
                    </div>
                </Link>
                <Link to ="/deposit">
                    <div
                        className="flex flex-col justify-center cursor-pointer w-40 h-40 p-9 bg-another_purple text-blue_txt_color rounded-xl shadow-md hover:shadow-lg ease-in-out duration-300"
                        onClick={() => setCashModal(false)}
                    >   
                        <img src={MoneyIcon}></img>
                        <h3 className="font-semibold">Deposits</h3>
                    </div>
                </Link>
                </div>
            </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;

