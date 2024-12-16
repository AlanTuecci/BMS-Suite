import React, { useContext } from "react";
import Sidebar from "../components/Sidebar";
import DashboardCard from "../components/DashboardCard";
import { AuthContext } from "../context/AuthContext";
import personIcon from "../media/dashboard/person_24dp_14213D_FILL0_wght400_GRAD0_opsz24.svg";
import groupIcon from "../media/dashboard/group_24dp_14213D_FILL0_wght400_GRAD0_opsz24.svg";
import cashIcon from "../media/dashboard/payments_24dp_14213D_FILL0_wght400_GRAD0_opsz24.svg";
import binIcon from "../media/dashboard/inventory_2_24dp_14213D_FILL0_wght400_GRAD0_opsz24.svg";
import timeIcon from "../media/dashboard/work_history_24dp_14213D_FILL0_wght400_GRAD0_opsz24.svg";

function Dashboard() {
  const { authState } = useContext(AuthContext);
  const { userType } = authState;

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const companyCards = [
    {
      title: "Time Management",
      description: "Log your hours for the work week.",
      link: "time-management",
      photo: timeIcon,
    },
    {
      title: "Inventory Summary",
      description: "Manage and update your inventory.",
      link: "inventory-summary",
      photo: binIcon,
    },
    {
      title: "Cash Control",
      description: "Monitor and manage your revenue stream.",
      link: "cash-control",
      photo: cashIcon,
    },
    {
      title: "Invite Employees",
      description: "Encountering a challenge? Seek assistance here.",
      link: "invite",
      photo: groupIcon,
    },
    {
      title: "Manage Employees",
      description: "Oversee and manage employee information.",
      link: "employee-permissions",
      photo: groupIcon,
    },
    {
      title: "My Info",
      description: "View and update your personal information.",
      link: "my-info",
      photo: personIcon,
    },
  ];

  const employeeCards = [
    {
      title: "Time Management",
      description: "Log your hours for the work week.",
      link: "time-management",
      photo: timeIcon,
    },
    {
      title: "Inventory Summary",
      description: "Manage and update your inventory.",
      link: "inventory-summary",
      photo: binIcon,
    },
    {
      title: "Cash Control",
      description: "Monitor and manage your revenue stream.",
      link: "cash-control",
      photo: cashIcon,
    },
    {
      title: "Invite Employees",
      description: "Encountering a challenge? Seek assistance here.",
      link: "invite",
      photo: groupIcon,
    },
    {
      title: "My Info",
      description: "View and update your personal information.",
      link: "my-info",
      photo: personIcon,
    },
    {
      title: "About Us",
      description: "An about us page.",
      link: "about-us",
      photo: personIcon,
    },
  ];

  const cardsToDisplay = userType === "company" ? companyCards : employeeCards;

  return (
    <div className="flex flex-col md:flex-row h-screen bg-bkgdb overflow-x-auto relative">
      <Sidebar />
      <div className="relative flex flex-col items-center justify-center flex-grow p-4">
        <div className="items-start justify-start text-center mb-4 md:mb-8 mt-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[#14213D]">Hello</h2>
          <p className="text-sm md:text-lg text-gray-600">{formattedDate}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full max-w-screen-xl">
          {cardsToDisplay.map((card) => (
            <DashboardCard
              key={card.title}
              title={card.title}
              description={card.description}
              link={card.link}
              photo={card.photo}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
