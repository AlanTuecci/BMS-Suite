import React from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { onLogout } from "../api/auth";
import { unAuthenicateUser } from "../redux/slices/authSlice";
import './css/sidebar.css';
import homeIcon from '../media/sidebar/Home.svg';
import suitcaseIcon from '../media/sidebar/Suitcase.svg';
import binIcon from '../media/sidebar/Bin.svg';
import cashIcon from '../media/sidebar/Cash.svg';
import questionIcon from '../media/sidebar/Question.svg';
import settingsIcon from '../media/sidebar/Settings.svg';
import logoutIcon from '../media/sidebar/LogOut.svg';

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await onLogout();
    dispatch(unAuthenicateUser());
    localStorage.removeItem("isAuth");
    navigate("/");
  };

  return (
    <div className="sidebar">
      <div className="icon-container">
        <img src={homeIcon} alt="Home" className="sidebar-icon" />
        <img src={suitcaseIcon} alt="Suitcase" className="sidebar-icon" />
        <img src={binIcon} alt="Bin" className="sidebar-icon" />
        <img src={cashIcon} alt="Cash" className="sidebar-icon" />
      </div>

      <div className="divider"></div>

      <div className="icon-container">
        <img src={questionIcon} alt="Question" className="sidebar-icon" />
        <img src={settingsIcon} alt="Settings" className="sidebar-icon" />
      </div>

      <div className="logout-container">
        <img 
          src={logoutIcon} 
          alt="Logout" 
          className="logout-icon" 
          onClick={handleLogout}
        />
      </div>
    </div>
  );
};

export default Sidebar;