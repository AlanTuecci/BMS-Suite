import React, { useState, useRef, useEffect } from "react";
import Layout from "../components/layout";
import { useNavigate } from "react-router-dom";
import './home.css';
import hompic from '../media/HomeScreen.png';
import employeeIcon from '../media/Employee.png';
import businessIcon from '../media/Business.png';

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
    navigate(route, { state: { userType } });
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
      <Layout>
        <div className={`content_container ${showModal ? 'blurred' : ''}`}>
          <div className="text_container">
            <h1>Designed to Improve <br /> The Efficiency of Operations</h1>
            <p>Revolutionizing Business Management Services. <br /> In an All-In-One Package.</p>
            <br />
            <div className="action_buttons">
              <button className="button_container" onClick={() => handleLoginRegisterClick('/login')}>
                Login
              </button>
              <button className="button_container" onClick={() => handleLoginRegisterClick('/register')}>
                Register
              </button>
            </div>
            <br />
            <img className="pic_container" src={hompic} alt="" />
          </div>
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
      </Layout>
    </div>
  );
};

export default Home;
