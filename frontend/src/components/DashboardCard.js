import React from "react";
import { NavLink } from "react-router-dom";

const DashboardCard = ({ title, description, link, photo }) => {
  return (
    <NavLink to={`/${link}`} className="w-full h-60">
      <button className="relative flex w-full items-center justify-start h-full p-4 bg-dashboard_base rounded-2xl shadow-md  shadow-dashboard_shadow shadow-opacity-50 hover:shadow-lg transform transition duration-300">
        <div class="flex flex-col items-start justify-start -mt-20">
          <span className="block text-lg md:text-3xl font-semibold text-[#14213D]">{title}</span>
          <p className="mt-2 text-sm md:text-lg text-gray-600 items-start justify-start">{description}</p>
        </div>

        <div class="absolute bottom-3 right-5">
          <img src={photo} alt="{photo}" className="w-20 h-20 object-contain" fill="#14213D"/>
        </div>
        
      </button>
    </NavLink>
  );
};

export default DashboardCard;
