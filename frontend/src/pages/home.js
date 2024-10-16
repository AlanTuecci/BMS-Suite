import React, { useState, useRef, useEffect } from "react";
import Layout from "../components/layout";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import './home.css';
import hompic from '../components/HomeScreen.png';

const Home = () => {
  const authState = useSelector((state) => state.auth);
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);
  const [route, setRoute] = useState('/login');
  const navigate = useNavigate();

  const handleLoginRegisterClick = (path) => {
    setRoute(path);
    setShowModal(true);
  };

  const handleOptionClick = () => {
    setShowModal(false);
    navigate(route);
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
                <div className="option_box" onClick={handleOptionClick}>
                  <h3>Business</h3>
                </div>
                <div className="option_box" onClick={handleOptionClick}>
                  <h3>Employee</h3>
                </div>
              </div>
              <button className="proceed_button" onClick={handleOptionClick}>
                Proceed to {route === '/login' ? 'Login' : 'Register'}
              </button>
            </div>
          </div>
        )}
      </Layout>
    </div>
  );
};

export default Home;