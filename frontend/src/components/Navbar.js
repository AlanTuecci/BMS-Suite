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
    <div>
      <div
        className={`flex justify-between items-center h-24 mx-auto px-4 max-w-[90%] text-[#0B1215] ${showModal} ? "opacity-50 ease-in-out duration-300 pointer-events-none" : ""}`}
      >
        <Link to="/" className="text-3xl font-bold justify-start">
          BMS Suite
        </Link>
        <div className="hidden md:flex justify-center">
          <ul className="flex font-medium">
            <li className="p-4 text-xl hover:underline underline-offset-4 decoration-[#0B1215]">
              <Link to="/">Home</Link>
            </li>
            <li className="p-4 text-xl hover:underline underline-offset-4 decoration-[#0B1215]">
              <Link to="/">Contact</Link>
            </li>
            <li className="p-4 text-xl hover:underline underline-offset-4 decoration-[#0B1215]">
              <Link to="/">About</Link>
            </li>
            <li className="p-4 text-xl hover:underline underline-offset-4 decoration-[#0B1215]">
              <Link to="/">Features</Link>
            </li>
            <li className="p-4 text-xl hover:underline underline-offset-4 decoration-[#0B1215]">
              <Link to="/">Learn More</Link>
            </li>
          </ul>
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
      </div>
      {showModal && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center z-[10]">
          <div
            className="bg-[#FBFBFE] max-w-[95%] p-12 rounded-xl text-center shadow-md z-[11]"
            ref={modalRef}
          >
            <h2 className="text-3xl font-bold">Select Your Role</h2>
            <div className="flex justify-center gap-7 px-5 mt-5">
              <div
                className="flex flex-col justify-center cursor-pointer p-9 bg-[#E0FAFF] rounded-xl shadow-md hover:shadow-lg ease-in-out duration-300"
                onClick={() => handleOptionClick("company")}
              >
                <BsBriefcase size={70} />
                <h3 className="font-semibold">Company</h3>
              </div>
              <div
                className="flex flex-col justify-center cursor-pointer p-9 bg-[#E0FAFF] rounded-xl shadow-md hover:shadow-lg ease-in-out duration-300"
                onClick={() => handleOptionClick("employee")}
              >
                <BsPersonVcard size={70} />
                <h3 className="font-semibold">Employee</h3>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="border-b-4 border-[#14213D]"></div>
    </div>
  );
};

export default Navbar;
