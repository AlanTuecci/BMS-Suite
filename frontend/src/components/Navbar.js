import React, { useState, useRef, useEffect } from "react";
import { BsPersonVcard, BsBriefcase } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);
  const [route, setRoute] = useState("/login");
  const navigate = useNavigate();

  const handleNav = () => {
    setNav(!nav);
  };

  const handleLoginRegisterClick = (path) => {
    console.log(path);
    setRoute(path);
    setShowModal(true);
  };

  const handleOptionClick = (userType) => {
    setShowModal(false);
    navigate(`/bms-suite${route}?userType=${userType}`);
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
    <header class="flex flex-wrap md:flex-nowrap z-50 w-full py-7">
      <div
        className={`relative max-w-7xl w-full grid md:grid-cols-12 items-center px-4 md:px-7 mx-auto ${showModal} ? "opacity-50 ease-in-out duration-300 pointer-events-none" : ""}`}
      >
        <div class="md:col-span-3 text-txt_color text-3xl flex justify-start items-center font-bold">BMS Suite</div>

        <div class="hidden md:flex md:col-span-6 justify-center items-center">
          <ul class="flex gap-7">
            <li class="relative py-2 px-2 inline-block text-black focus:outline-none before:absolute before:bottom-0.5 before:start-0 before:-z-[1] before:w-full before:h-1 before:bg-lime-400 dark:text-white">
              <Link to="/bms-suite">Home</Link>
            </li>
            <li class="relative py-2 px-2 inline-block text-black focus:outline-none before:absolute before:bottom-0.5 before:start-0 before:-z-[1] before:w-full before:h-1 before:bg-lime-400 dark:text-white">
              <Link to="/bms-suite">About</Link>
            </li>
            <li class="relative py-2 px-2 inline-block text-black focus:outline-none before:absolute before:bottom-0.5 before:start-0 before:-z-[1] before:w-full before:h-1 before:bg-lime-400 dark:text-white">
              <Link to="/bms-suite">Feature</Link>
            </li>
            <li class="relative py-2 px-2 inline-block text-black focus:outline-none before:absolute before:bottom-0.5 before:start-0 before:-z-[1] before:w-full before:h-1 before:bg-lime-400 dark:text-white">
              <Link to="/bms-suite">Contact</Link>
            </li>
          </ul>
        </div>

        <div class="flex items-center gap-x-2 justify-end md:col-span-3">
          <button
            class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-3xl bg-transparent border border-txt_color text-txt_color hover:scale-105"
            onClick={() => handleLoginRegisterClick("/login")}
          >
            Log in
          </button>
          <button
            class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-3xl bg-compblue border border-compblue text-bkgd hover:shadow-2xl hover:shadow-dashboard_shadow hover:scale-105"
            onClick={() => handleLoginRegisterClick("/register")}
          >
            Sign Up
          </button>
        </div>

        <div
          className={
            nav
              ? "fixed left-0 top-0 w-[60%] h-full bg-[#FBFBFE] text-[#0B1215] border-r-2 border-r-[#0B1215] east-in-out duration-500"
              : "fixed left-[-100%] "
          }
        >
          <h1 className="w-full text-3xl font-bold m-4 pt-3">BMS Suite</h1>
          <ul className="p-2">
            <li className="p-4 border-b-2 text-lg border-b-[#0B1215]">About</li>
            <li className="p-4 border-b-2 text-lg border-b-[#0B1215]">Features</li>
            <li className="p-4 border-b-2 text-lg border-b-[#0B1215]">Home</li>
            <li className="p-4 text-lg">Contact</li>
          </ul>
          <div className="flex pt-12 justify-between mx-auto max-w-[80%]">
            <button
              className="px-3 py-2 text-xl border-x-2 border-y-2 border-x-[#0B1215] rounded-full border-y-[#0B1215]"
              onClick={() => handleLoginRegisterClick("/login")}
            >
              Login
            </button>
            <button
              className="px- py-2 text-xl text-[#FBFBFE] bg-[#2F27CE] border-x-2 border-y-2 border-x-[#2F27CE] rounded-full border-y-[#2F27CE]"
              onClick={() => handleLoginRegisterClick("/register")}
            >
              Register
            </button>
          </div>
        </div>

        {showModal && (
          <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center z-[10]">
            <div className="bg-[#FBFBFE] max-w-[95%] p-12 rounded-xl text-center shadow-md z-[11]" ref={modalRef}>
              <h2 className="text-3xl text-compblue font-bold">Select Your Role</h2>
              <div className="flex justify-center gap-7 px-5 mt-5">
                <div
                  className="flex flex-col justify-center cursor-pointer p-9 bg-compblue rounded-xl shadow-md hover:shadow-lg ease-in-out duration-300"
                  onClick={() => handleOptionClick("company")}
                >
                  <BsBriefcase size={70} />
                  <h3 className="font-semibold">Company</h3>
                </div>
                <div
                  className="flex flex-col justify-center cursor-pointer p-9 bg-compblue rounded-xl shadow-md hover:shadow-lg ease-in-out duration-300"
                  onClick={() => handleOptionClick("employee")}
                >
                  <BsPersonVcard size={70} />
                  <h3 className="font-semibold">Employee</h3>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
