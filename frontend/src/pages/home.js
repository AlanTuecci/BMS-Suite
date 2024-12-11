import React, { useState, useRef, useEffect } from "react";
import { ReactTyped } from "react-typed";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Timekeeping from "../components/Cards/Timekeeping";
import CashManagement from "../components/Cards/CashManagement";
import ProductManagement from "../components/Cards/ProductManagement";
import { BsPersonVcard, BsBriefcase } from "react-icons/bs";
import wmnpg from "../media/homepage/woman-home.webp";
import menpg from "../media/homepage/man-homepg.jpg";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);
  const [route, setRoute] = useState("/login");
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
    <div className="bg-bkgd min-h-screen text-white overflow-y-auto"> 
      <Navbar />
      <div className="flex space-x-0 sm:max-w-[90%] mx-auto justify-center py-8">
        <div className="lg:w-4/6 px-4 lg:pt-0 py-2 flex flex-col justify-center text-center text-[#FBFBFE]">
          <h1 className="md:text-4xl lg:text-5xl xl:text-6xl font-bold text-3xl text-[#14213D]">
            Designed to improve the efficiency of business operations
          </h1>
          <div className="flex p-8 mx-4 items-center justify-center rounded-md lg:hidden">
            <img
              src={menpg}
              alt="Business Management"
              className="object-fit h-auto rounded-3xl"
            />
          </div>
          <h1 className="lg:pt-14 lg:text-3xl text-2xl font-bold text-[#14213D]">
            An online business management software suite
          </h1>
          <p className="lg:pt-2 lg:text-2xl pt-2 font-bold text-lg text-[#14213D]">
            For all your&nbsp;
            <ReactTyped
              className="text-[#2F27CE]"
              strings={["cash", "time-punch", "inventory"]}
              typeSpeed={50}
              showCursor={false}
              loop
            />
            &nbsp;management needs
          </p>
          <div className="pt-8 justify-center">
            <button
               className="px-5 py-2.5 mx-2 text-xl text-bkgd bg-compblue transition duration-200 rounded-full hover:shadow-xl hover:shadow-[#cdccf4] hover:scale-105"
              onClick={() => handleLoginRegisterClick("/register")}
            >
              Get Started
            </button>
            <button 
              className="px-5 py-2.5 mx-2 text-xl text-[#14213D] transition duration-200 rounded-full border-3 border-[#14213D] hover:scale-105"
              onClick={() => handleLoginRegisterClick("/Login")}
            >
              Learn More
            </button>
          </div>
        </div>
        <div className="hidden lg:w-2/6 lg:flex lg:justify-center lg:py-8 lg:px-2">
          <img
            src={wmnpg}
            alt="Business Management"
            className="object-scale-down h-auto rounded-3xl"
          />
        </div>
      </div>
      <div className="bg-darker_purple text-bkgd md:mt-4 mt-16 py-12 pb-20">
        <div className="w-[90%] mx-auto">
          <h1 className="font-medium text-4xl">
            Optimize your time and effortlessly manage your team with our tools
          </h1>
          <div className="lg:flex lg:flex-row lg:justify-around">
            <Timekeeping />
            <CashManagement />
            <ProductManagement />
          </div>
        </div>
      </div>

      /* i want to add the customized plan thing here and a footer*/
      <div class="relative">
        <div class="flex flex-col justify-center items-center bg-bkgd md:mt-4 mt-16 py-12 pb-20">
          <h1 class="items-center text-txt_color text-4xl font-bold text-center mb-2">Customized Plans <br/> For Your Business Needs</h1>
          <p class="text-txt_color text-base mb-2">Flexible Pricing For Any Business Size</p>

          <div class="py-5 text-txt_color">
            <ul class="flex gap-10">
              <li class="text-center px-4">
                <h2 class="text-4xl font-bold mb-2">300</h2>
                <p class="text-base font-medium">Active Users</p>
              </li>
              <li class="text-center px-4">
                <h2 class="text-4xl font-bold mb-2">35%</h2>
                <p class="text-base font-medium">Boosts <br/> Productivity</p>
              </li>
              <li class="text-center px-4">
                <h2 class="text-4xl font-bold mb-2">4.8/5</h2>
                <p class="text-base font-medium">From User <br/> Feedback Survey</p>
              </li>
            </ul>
          </div>
        </div> 

        <footer class="bg-[#E5E4FF] w-full mt-16 py-12 pb-20 z-10">
          <div class="flex flex-col justify-center items-center text-txt_color">
          </div>
        </footer>

        <div class="flex justify-center items-center">
          <div class=" flex justify-between bg-[#17118A] w-[60%] h-180 absolute bottom-75 z-20 rounded-3xl text-bkgd ">
            <div class ="flex flex-col justify-center px-4">
              <h2 class="text-2xl font-semibold"> Ready to Take Control <br/> Of Your Business with Ease?</h2>
              <p class="text-sm font-medium">Transforming Business Management with and All-In-One Solution</p>
            </div>
            <div class="flex justify-center items-center w-auto px-4">
              <button className="px-5 py-2.5 mx-2 text-xl text-bkgd bg-compblue transition duration-200 rounded-full hover:shadow-xl hover:scale-105"
              onClick={() => handleLoginRegisterClick("/register")}> Get Started </button>
            </div>
          </div>
        </div>
        
      </div>
      
      {showModal && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center z-[10]">
          <div
            className="bg-[#F0FAFC] max-w-[95%] p-12 rounded-xl text-center shadow-md z-[11]"
            ref={modalRef}
          >
            <h2 className="text-3xl text-[#14213D] bg-[#F0FAFC] font-bold">
              Select Your Role
            </h2>
            <div className="flex justify-center gap-7 px-5 mt-5">
              <div
                className="flex flex-col justify-center cursor-pointer p-9 bg-[#14213D] text-[#F0FAFC] rounded-xl shadow-md hover:shadow-lg ease-in-out duration-300"
                onClick={() => handleOptionClick("company")}
              >
                <BsBriefcase size={70} />
                <h3 className="font-semibold">Company</h3>
              </div>
              <div
                className="flex flex-col justify-center cursor-pointer p-9 bg-[#14213D] text-[#F0FAFC] rounded-xl shadow-md hover:shadow-lg ease-in-out duration-300"
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
  );
};

export default Home;
