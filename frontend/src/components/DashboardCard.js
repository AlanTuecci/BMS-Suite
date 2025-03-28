import React from "react";
import { NavLink } from "react-router-dom";

const DashboardCard = ({ title, description, link, photo, onClick }) => {
  const handleClick = (event) => {
    if (onClick) {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <NavLink to={`/bms-suite/${link}`} className="w-full h-60" onClick={handleClick}>
      <button className="relative flex w-full items-center justify-start h-full p-4 bg-dashboard_base rounded-2xl shadow-md shadow-dashboard_shadow shadow-opacity-50 hover:shadow-lg transform transition duration-300">
        <div className="flex flex-col items-start justify-start -mt-20">
          <span className="block text-lg md:text-3xl font-semibold text-[#14213D]">{title}</span>
          <p className="mt-2 text-sm md:text-lg text-gray-600">{description}</p>
        </div>
        <div className="absolute bottom-3 right-5">
          <img src={photo} alt={photo} className="w-20 h-20 object-contain" fill="#14213D" />
        </div>
      </button>
    </NavLink>
  );
};

export default DashboardCard;
