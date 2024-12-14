import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import DashboardCard from "../components/DashboardCard";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import personIcon from "../media/dashboard/person_24dp_14213D_FILL0_wght400_GRAD0_opsz24.svg";
import groupIcon from "../media/dashboard/group_24dp_14213D_FILL0_wght400_GRAD0_opsz24.svg";
import cashIcon from "../media/dashboard/payments_24dp_14213D_FILL0_wght400_GRAD0_opsz24.svg";
import binIcon from "../media/dashboard/inventory_2_24dp_14213D_FILL0_wght400_GRAD0_opsz24.svg";
import timeIcon from "../media/dashboard/work_history_24dp_14213D_FILL0_wght400_GRAD0_opsz24.svg";

const Dashboard = () => {

  const [activeModal, setActiveModal] = useState(false); 
  const handleCloseModal = () => setActiveModal(null);


  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="flex flex-col md:flex-row h-screen bg-bkgdb overflow-x-auto relative">
      <Sidebar />
      <div className="relative flex flex-col items-center justify-center flex-grow p-4">
        <div className="items-start justify-start text-center mb-4 md:mb-8 mt-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[#14213D]">Hello</h2>
          <p className="text-sm md:text-lg text-gray-600">{formattedDate}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full max-w-screen-xl">
          <DashboardCard 
            title="Time Management" 
            description="Log your hours for the work week." 
            link="time-management" 
            photo={timeIcon}
          />
          <DashboardCard 
            title="Product Management" 
            description="Manage and update your inventory." 
            link="product-management" 
            photo={binIcon}
          />
          <DashboardCard 
            title="Cash Control" 
            description="Monitor and manage your revenue stream." 
            link="deposit"
            photo={cashIcon}
            onClick={() => setActiveModal("true")}
          />

          <DashboardCard 
            title="Invite Employees" 
            description="Encountering a challenge? Seek assistance here." 
            link="invite" 
            photo={groupIcon}
          />
          
            <DashboardCard 
              title="Manage Employees" 
              description="Oversee and manage employee information." 
              link="employee-permissions" 
              photo={groupIcon}
            />
    
            <DashboardCard 
              title="My Info" 
              description="View and update your personal information." 
              link="my-info" 
              photo={personIcon}
            />
     
          <DashboardCard 
            title="About us" 
            description="An about us page" 
            link="count" 
            photo={personIcon}
          />
        </div>

        {activeModal && (
          <>
          <div id="default-modal" class="modal hidden fixed top-0 left-0 w-screen h-screen flex justify-center items-center z-[20]">
            <div
              className="bg-[#F0FAFC] max-w-[95%] p-12 rounded-xl text-center shadow-md z-[11]">
              <div className="flex justify-center gap-7 px-5 mt-5">
                <div
                  className="flex flex-col justify-center cursor-pointer p-9 bg-[#14213D] text-[#F0FAFC] rounded-xl shadow-md hover:shadow-lg ease-in-out duration-300"
                  // onClick={() => handleOptionClick("company")}
                >
                  <h3 className="font-semibold">Company</h3>
                </div>
                <div
                  className="flex flex-col justify-center cursor-pointer p-9 bg-[#14213D] text-[#F0FAFC] rounded-xl shadow-md hover:shadow-lg ease-in-out duration-300"
                  // onClick={() => handleOptionClick("employee")}
                >
                  <h3 className="font-semibold">Employee</h3>
                </div>
              </div>
            </div>
          </div>
          <div class="overlay hidden fixed bg-black bg-opacity-50 z-10 blur-lg"></div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
