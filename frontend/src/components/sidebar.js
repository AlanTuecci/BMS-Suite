import React from 'react';
import './css/sidebar.css';
import homeIcon from '../media/sidebar/Home.png';
import suitcaseIcon from '../media/sidebar/Suitcase.png';
import binIcon from '../media/sidebar/Bin.png';
import cashIcon from '../media/sidebar/Cash.png';
import questionIcon from '../media/sidebar/Question.png';
import settingsIcon from '../media/sidebar/Settings.png';
import logoutIcon from '../media/sidebar/LogOut.png';

const Sidebar = () => {
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
        <img src={logoutIcon} alt="Logout" className="logout-icon" />
      </div>
    </div>
  );
};

export default Sidebar;