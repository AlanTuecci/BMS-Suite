import React from "react";
import Sidebar from "../components/sidebar";
import DashboardCard from "../components/DashboardCard";
import { useSelector } from "react-redux";

function Dashboard() {
  const userType = useSelector((state) => state.auth.userType);

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gradient-to-r from-[#F0FAFC] via-[#D1E6F0] to-[#A3CEDF]">
      <Sidebar />
      <div className="flex flex-col items-center justify-center flex-grow p-4">
        <div className="text-center mb-4 md:mb-8">
          <h2 className="text-2xl md:text-5xl font-bold text-[#14213D]">Hello</h2>
          <p className="text-sm md:text-lg text-gray-600">{formattedDate}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full max-w-screen-xl">
          <DashboardCard 
            title="Timekeeping" 
            description="Log your hours for the work week." 
            link="timekeeping" 
          />
          <DashboardCard 
            title="Product Management" 
            description="Manage and update your inventory." 
            link="product-management" 
          />
          <DashboardCard 
            title="Cash Control" 
            description="Monitor and manage your revenue stream." 
            link="cash-control" 
          />
          <DashboardCard 
            title="Employees" 
            description="Encountering a challenge? Seek assistance here." 
            link="invite" 
          />
          {userType === "company" ? (
            <DashboardCard 
              title="Manage Employees" 
              description="Oversee and manage employee information." 
              link="manage-employees" 
            />
          ) : (
            <DashboardCard 
              title="My Info" 
              description="View and update your personal information." 
              link="my-info" 
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
