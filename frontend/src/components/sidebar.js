import React from "react";
import { useDispatch } from "react-redux";
import {Link, useNavigate } from "react-router-dom";
import { onLogout } from "../api/auth";
import { unAuthenicateUser } from "../redux/slices/authSlice";
import homeIcon from '../media/product/home_24dp_FBFBFE_FILL0_wght400_GRAD0_opsz24.svg';
import suitcaseIcon from '../media/product/work_history_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg';
import binIcon from '../media/product/inventory_2_24dp_FBFBFE_FILL0_wght400_GRAD0_opsz24.svg';
import cashIcon from '../media/product/payments_24dp_FBFBFE_FILL0_wght400_GRAD0_opsz24.svg';
import questionIcon from '../media/product/help_24dp_FBFBFE_FILL0_wght400_GRAD0_opsz24.svg';
import settingsIcon from '../media/product/settings_24dp_FBFBFE_FILL0_wght400_GRAD0_opsz24.svg';
import logoutIcon from '../media/product/logout_24dp_FBFBFE_FILL0_wght400_GRAD0_opsz24.svg';
import { FiMenu, FiX } from 'react-icons/fi';
import Logo from '../media/Rough logo.png'

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
    <>
      <button
        className={`fixed top-4 left-4 z-50 p-2 rounded-full shadow-md bg-compblue border border-gray-300
                    ${isCollapsed ? "" : "hidden"}`}
        onClick={() => setIsCollapsed(false)} >
        <FiMenu size={24} className='text-bkgd'/>
      </button>

      <div
        className={`fixed top-0 left-0 h-screen bg-compblue border-r border-gray-200 flex flex-col justify-between items-center
                    transition-transform duration-300 shadow-md z-40
                    ${isCollapsed ? "-translate-x-full" : "translate-x-0 w-13"}`} >
        <div className="flex justify-end p-4">
          <button
            className="bg-complblue border border-gray-300 rounded-full p-1 shadow-md"
            onClick={() => setIsCollapsed(true)}
          >
            <FiX size={20} className='text-bkgd'/>
          </button>
        </div>

        <div className="flex flex-col items-center justify-center space-y-8 py-6 px-2">

          <button type='button' class="hover:scale-110 transition-transform duration-300">
            <Link to ='/dashboard'><img src={homeIcon} alt="Home" className="w-8 h-8" /></Link>
          </button>

          <button type ="button">
            <Link to ='/dashboard'><img src={suitcaseIcon} alt="Suitcase" className="w-8 h-8 hover:scale-110 transition-transform duration-300" /></Link>
          </button>

          <button>
            <Link to='/prdmgmt'><img src={binIcon} alt="Bin" className="w-8 h-8 hover:scale-110 transition-transform duration-300" /></Link>
          </button>

          <button>
            <Link to='/dashboard'><img src={cashIcon} alt="Cash" className="w-8 h-8 hover:scale-110 transition-transform duration-300" /></Link>
          </button>
        </div>

        <div className="flex flex-col items-center space-y-8 mt-10 border-t border-gray-200 pt-6">

          <button>
            <img src={questionIcon} alt="Question" className="w-8 h-8 hover:scale-110 transition-transform duration-300" />
          </button>

          <button>
            <img src={settingsIcon} alt="Settings" className="w-8 h-8 hover:scale-110 transition-transform duration-300" />
          </button>
        </div>

        <div className="flex items-center justify-center mt-auto mb-4">
          <button> 
            <img 
              src={logoutIcon} 
              alt="Logout" 
              className="w-8 h-8 hover:scale-110 transition-transform duration-300 cursor-pointer"
              onClick={handleLogout}
            />
          </button>
          
        </div>
        
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
            <span className="hidden group-hover:inline-block text-gray-800 text-sm z-10 font-bold relative whitespace-nowrap">
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
            <span className="hidden group-hover:inline-block text-gray-800 text-sm z-10 font-bold relative whitespace-nowrap">
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
