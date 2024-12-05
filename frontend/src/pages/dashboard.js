import React from "react";
import Sidebar from "../components/sidebar";
import DashboardCard from "../components/DashboardCard";
import DashboardNavbar from "../components/DashboardNavbar";
import { useSelector } from "react-redux";
import personIcon from "../media/dashboard/person_24dp_14213D_FILL0_wght400_GRAD0_opsz24.svg";
import groupIcon from '../media/dashboard/group_24dp_14213D_FILL0_wght400_GRAD0_opsz24.svg'
import cashIcon from '../media/dashboard/payments_24dp_14213D_FILL0_wght400_GRAD0_opsz24.svg'
import binIcon from '../media/dashboard/inventory_2_24dp_14213D_FILL0_wght400_GRAD0_opsz24.svg'
import timeIcon from '../media/dashboard/work_history_24dp_14213D_FILL0_wght400_GRAD0_opsz24.svg'


function Dashboard() {
  const userType = useSelector((state) => state.auth.userType);

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
        <div class=" absolute top-1 w-full md:max-w-7xl flex justify-center z-10"><DashboardNavbar/></div>
        <div className="items-start justify-start text-center mb-4 md:mb-8 mt-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[#14213D]">Hello</h2>
          <p className="text-sm md:text-lg text-gray-600">{formattedDate}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full max-w-screen-xl">
          <DashboardCard 
            title="Timekeeping" 
            description="Log your hours for the work week." 
            link="timekeeping" 
            photo = {timeIcon}
          />
          <DashboardCard 
            title="Product Management" 
            description="Manage and update your inventory." 
            link="prdmgmt" 
            photo={binIcon}
          />
          <DashboardCard 
            title="Cash Control" 
            description="Monitor and manage your revenue stream." 
            link="navbar2"
            photo={cashIcon}

          />
          <DashboardCard 
            title="Employees" 
            description="Encountering a challenge? Seek assistance here." 
            link="invite" 
            photo={groupIcon}
          />
          {userType === "company" ? (
            <DashboardCard 
              title="Manage Employees" 
              description="Oversee and manage employee information." 
              link="manage-employees" 
              photo={groupIcon}
            />
          ) : (
            <DashboardCard 
              title="My Info" 
              description="View and update your personal information." 
              link="my-info" 
              photo={personIcon}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
