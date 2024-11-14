import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { onLogout } from "../api/auth";
import { unAuthenicateUser } from "../redux/slices/authSlice";
import homeIcon from '../media/sidebar/Home.svg';
import suitcaseIcon from '../media/sidebar/Suitcase.svg';
import binIcon from '../media/sidebar/Bin.svg';
import cashIcon from '../media/sidebar/Cash.svg';
import questionIcon from '../media/sidebar/Question.svg';
import settingsIcon from '../media/sidebar/Settings.svg';
import logoutIcon from '../media/sidebar/LogOut.svg';
import { FiMenu, FiX } from 'react-icons/fi';

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const handleLogout = async () => {
    await onLogout();
    dispatch(unAuthenicateUser());
    localStorage.removeItem("isAuth");
    navigate("/");
  };

  return (
    <>
      <button
        className={`fixed top-4 left-4 z-50 p-2 rounded-full shadow-md bg-[#F0FAFC] border border-gray-300
                    ${isCollapsed ? "" : "hidden"}`}
        onClick={() => setIsCollapsed(false)} >
        <FiMenu size={24} />
      </button>

      <div
        className={`fixed top-0 left-0 h-screen bg-[#F0FAFC] border-r border-gray-200 flex flex-col justify-between
                    transition-transform duration-300 shadow-md z-40
                    ${isCollapsed ? "-translate-x-full" : "translate-x-0 w-20"}`} >
        <div className="flex justify-end p-4">
          <button
            className="bg-[#F0FAFC] border border-gray-300 rounded-full p-1 shadow-md"
            onClick={() => setIsCollapsed(true)}
          >
            <FiX size={20} />
          </button>
        </div>

        <div className="flex flex-col items-center space-y-8 py-6 px-2">
          <img src={homeIcon} alt="Home" className="w-8 h-8 hover:scale-110 transition-transform duration-300" />
          <img src={suitcaseIcon} alt="Suitcase" className="w-8 h-8 hover:scale-110 transition-transform duration-300" />
          <img src={binIcon} alt="Bin" className="w-8 h-8 hover:scale-110 transition-transform duration-300" />
          <img src={cashIcon} alt="Cash" className="w-8 h-8 hover:scale-110 transition-transform duration-300" />
        </div>

        <div className="flex flex-col items-center space-y-8 mt-10 border-t border-gray-200 pt-6">
          <img src={questionIcon} alt="Question" className="w-8 h-8 hover:scale-110 transition-transform duration-300" />
          <img src={settingsIcon} alt="Settings" className="w-8 h-8 hover:scale-110 transition-transform duration-300" />
        </div>

        <div className="flex items-center justify-center mt-auto mb-4">
          <img 
            src={logoutIcon} 
            alt="Logout" 
            className="w-8 h-8 hover:scale-110 transition-transform duration-300 cursor-pointer"
            onClick={handleLogout}
          />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
