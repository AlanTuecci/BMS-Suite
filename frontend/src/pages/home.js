import React, { useState } from "react";
import Layout from "../components/layout";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import './home.css';
import hompic from '../components/HomeScreen.png';

const Home = () => {
  const authState = useSelector((state) => state.auth);
  const [showModal, setShowModal] = useState(false);

  const handleLoginRegisterClick = () => {
    setShowModal(true);
  };

  const handleOptionClick = () => {
    setShowModal(false);
  };

  return (
    <div className="background">
      <Layout>
        <div className={`content_container ${showModal ? 'blurred' : ''}`}>
          <div className="text_container">
            <h1>Designed to Improve <br /> The Efficiency of Operations</h1>
            <p>Revolutionizing Business Management Services. <br /> In an All-In-One Package.</p>
            <br />
            <div className="action_buttons">
              <button className="button_container" onClick={handleLoginRegisterClick}>
                Login
              </button>
              <button className="button_container" onClick={handleLoginRegisterClick}>
                Register
              </button>
            </div>
            <br />
            <img className="pic_container" src={hompic} alt="" />
          </div>
        </div>

        {showModal && (
          <div className="modal_background">
            <div className="modal_container">
              <h2>Select Your Role</h2>
              <div className="options_container">
                <div className="option_box" onClick={handleOptionClick}>
                  <h3>Business</h3>
                </div>
                <div className="option_box" onClick={handleOptionClick}>
                  <h3>Employee</h3>
                </div>
              </div>
              <NavLink to="/login" className="proceed_button">Proceed to Login</NavLink>
            </div>
          </div>
        )}
      </Layout>
    </div>
  );
};

export default Home;