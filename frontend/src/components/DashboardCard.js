import React from "react";
import { NavLink } from "react-router-dom";

const DashboardCard = ({ title, description, link }) => {
  return (
    <NavLink to={`/${link}`} className="w-full h-60">
      <button className="w-full h-full p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transform transition duration-300">
        <span className="block text-lg md:text-2xl font-semibold text-[#14213D]">
          {title}
        </span>
        <p className="mt-2 text-sm md:text-base text-gray-600">{description}</p>
      </button>
    </NavLink>
  );
};

export default DashboardCard;
