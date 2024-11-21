import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { onLogout } from "../api/auth";
import { unAuthenicateUser } from "../redux/slices/authSlice";
import homeIcon from "../media/sidebar/Home.svg";
import suitcaseIcon from "../media/sidebar/Suitcase.svg";
import binIcon from "../media/sidebar/Bin.svg";
import cashIcon from "../media/sidebar/Cash.svg";
import questionIcon from "../media/sidebar/Question.svg";
import settingsIcon from "../media/sidebar/Settings.svg";
import logoutIcon from "../media/sidebar/LogOut.svg";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await onLogout();
    dispatch(unAuthenicateUser());
    localStorage.removeItem("isAuth");
    navigate("/");
  };

  const menuItems = [
    { icon: homeIcon, label: "Dashboard", path: "/dashboard" },
    { icon: suitcaseIcon, label: "Time Management", path: "/Time-management" },
    { icon: binIcon, label: "Product Management", path: "/product-management" },
    { icon: cashIcon, label: "Cash Control", path: "/cash-control" },
  ];
  
  const utilityItems = [
    { icon: questionIcon, label: "Help", path: "/help" },
    { icon: settingsIcon, label: "Settings", path: "/settings" },
  ];

  return (
    <div className="fixed top-0 left-0 h-screen bg-[#F0FAFC] border-r border-gray-200 flex flex-col justify-between py-6 px-4 shadow-md transition-all duration-300 group hover:w-64 w-20 z-50">
      <div className="flex items-center space-x-4 mb-8">
        <div className="w-10 h-10 bg-gray-300 rounded"></div>
        <span className="hidden group-hover:inline-block text-sm font-bold text-gray-800 whitespace-nowrap">
          BMS Suite
        </span>
      </div>

      <div className="space-y-8">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-center group-hover:justify-start space-x-4 hover:cursor-pointer relative transition-all duration-300 transform -translate-x-2"
            onClick={() => navigate(item.path)}
          >
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-20 h-10 group-hover:w-64 rounded-l-md z-0 transition-all duration-300"></div>
            <img
              src={item.icon}
              alt={item.label}
              className="w-6 h-6 z-10 hover:scale-110 transition duration-300"
            />
            <span
              className="hidden group-hover:inline-block text-gray-800 text-sm z-10 font-bold relative whitespace-nowrap"
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-10 border-t border-gray-200 pt-6 space-y-8">
        {utilityItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-center group-hover:justify-start space-x-4 hover:cursor-pointer relative transition-all duration-300 transform -translate-x-2"
          >
            <div className="w-20 h-10 group-hover:w-64 rounded-l-md absolute left-0 z-0 transition-all duration-300"></div>
            <img
              src={item.icon}
              alt={item.label}
              className="w-6 h-6 z-10 hover:scale-110 transition duration-300"
            />
            <span
              className="hidden group-hover:inline-block text-gray-800 text-sm z-10 font-bold relative whitespace-nowrap"
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center group-hover:justify-start space-x-4 mt-auto hover:cursor-pointer relative transition-all duration-300">
        <div className="w-20 h-10 group-hover:w-64 rounded-l-md absolute left-0 z-0 transition-all duration-300"></div>
        <img
          src={logoutIcon}
          alt="Logout"
          className="w-6 h-6 z-10 hover:scale-110 transition duration-300"
          onClick={handleLogout}
        />
        <span className="hidden group-hover:inline-block text-gray-800 text-sm z-10 font-bold">
          Logout
        </span>
      </div>

    </div>
  );
};

export default Sidebar;
