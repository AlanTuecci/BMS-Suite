import React, { useState, useContext } from 'react';
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import homeIcon from '../media/product/home_24dp_FBFBFE_FILL0_wght400_GRAD0_opsz24.svg';
import suitcaseIcon from '../media/product/work_history_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg';
import binIcon from '../media/product/inventory_2_24dp_FBFBFE_FILL0_wght400_GRAD0_opsz24.svg';
import cashIcon from '../media/product/payments_24dp_FBFBFE_FILL0_wght400_GRAD0_opsz24.svg';
import questionIcon from '../media/product/help_24dp_FBFBFE_FILL0_wght400_GRAD0_opsz24.svg';
import settingsIcon from '../media/product/settings_24dp_FBFBFE_FILL0_wght400_GRAD0_opsz24.svg';
import logoutIcon from '../media/product/logout_24dp_FBFBFE_FILL0_wght400_GRAD0_opsz24.svg';
import { FiMenu, FiX } from 'react-icons/fi';

const Sidebar = () => {
  const { logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleLogout = async () => {
    await logoutUser(navigate);
  };

  return (
    <>
      <button
        className={`fixed top-4 left-4 z-50 p-2 rounded-full shadow-md bg-compblue border border-gray-300
                    ${isCollapsed ? "" : "hidden"}`}
        onClick={() => setIsCollapsed(false)}>
        <FiMenu size={24} className='text-bkgd' />
      </button>

      <div
        className={`fixed top-0 left-0 h-screen bg-compblue border-r border-gray-200 flex flex-col justify-between items-center
                    transition-transform duration-300 shadow-md z-40
                    ${isCollapsed ? "-translate-x-full" : "translate-x-0 w-13"}`}>
        <div className="flex justify-end p-4">
          <button
            className="bg-complblue border border-gray-300 rounded-full p-1 shadow-md"
            onClick={() => setIsCollapsed(true)}
          >
            <FiX size={20} className='text-bkgd' />
          </button>
        </div>

        <div className="flex flex-col items-center justify-center space-y-8 py-6 px-2">
          <button type='button' className="hover:scale-110 transition-transform duration-300">
            <Link to='/dashboard'><img src={homeIcon} alt="Home" className="w-8 h-8" /></Link>
          </button>

          <button type="button">
            <Link to='/time-management'><img src={suitcaseIcon} alt="Suitcase" className="w-8 h-8 hover:scale-110 transition-transform duration-300" /></Link>
          </button>

          <button>
            <Link to='/inventory-summary'><img src={binIcon} alt="Bin" className="w-8 h-8 hover:scale-110 transition-transform duration-300" /></Link>
          </button>

          <button>
            <Link to='/cash-control'><img src={cashIcon} alt="Cash" className="w-8 h-8 hover:scale-110 transition-transform duration-300" /></Link>
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
          <button onClick={handleLogout}>
            <img
              src={logoutIcon}
              alt="Logout"
              className="w-8 h-8 hover:scale-110 transition-transform duration-300 cursor-pointer"
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;