import React, { useState, useRef, useEffect } from "react";
import Navbar from "../components/navbar";
import { useNavigate } from "react-router-dom";
import './css/home.css';
import wmnpg from '../media/homepage/woman-home.webp';
import menpg from '../media/homepage/man-homepg.jpg';
import employeeIcon from '../media/homepage/Employee.png';
import businessIcon from '../media/homepage/Business.png';

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);
  const [route, setRoute] = useState('/login');
  const navigate = useNavigate();

  const handleLoginRegisterClick = (path) => {
    setRoute(path);
    setShowModal(true);
  };

  const handleOptionClick = (userType) => {
    setShowModal(false);
    navigate(`${route}?userType=${userType}`);
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setShowModal(false);
    }
  };

  useEffect(() => {
    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal]);

  return (
    <div className="background">
      <Navbar />
        <div className={`content_container ${showModal ? 'blurred' : ''}`}>
          <div className="text_container">
            <h1>Designed to Improve <br /> The Efficiency of <br/> Operations</h1>
            <p>Revolutionizing Business Management Services. <br /> In an All-In-One Package.</p>
            <br />
            <div className="action_buttons">
              <button className="button_container" onClick={() => handleLoginRegisterClick('/register')}>
                  Register
              </button>
              <button className="button_container" onClick={() => handleLoginRegisterClick('/login')}>
                  Login
              </button>
          </div>
          <div className="info_container">
                <ul className="info_list">
                  <li><b className="info_container_header">Easily</b><br/><span>Manage Products</span></li>
                  <li><b className="info_container_header">Quickly</b><br/><span>Track Hours</span></li>
                  <li><b className="info_container_header">Effortlessly</b><br/><span>Manage Cash Flow</span></li>
                </ul>
            </div>
            <br />
          </div>
          <img className="woman-img" src={wmnpg} alt=""></img>
          <img className="man-img" src={menpg} alt=""></img>
        </div>

        {showModal && (
          <div className="modal_background">
            <div className="modal_container" ref={modalRef}>
              <h2>Select Your Role</h2>
              <div className="options_container">
                <div className="option_box" onClick={() => handleOptionClick('company')}>
                  <img src={businessIcon} alt="Company" className="option_icon" />
                  <h3>Company</h3>
                </div>
                <div className="option_box" onClick={() => handleOptionClick('employee')}>
                  <img src={employeeIcon} alt="Employee" className="option_icon" />
                  <h3>Employee</h3>
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default Home;