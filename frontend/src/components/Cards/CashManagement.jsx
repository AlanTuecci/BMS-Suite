import React from "react";
import { AiFillBank } from "react-icons/ai";

const CashManagement = () => {
  return (
    <div className="2xl:max-w-[50%] lg:max-w-[33%] sm:max-w-[50%] max-w-[80%] rounded-lg mt-8 mx-4 p-4 border-2 border-white">
      <AiFillBank size={80} />
      <h1 className="font-bold lg:text-2xl text-lg mx-2 mt-2">
        Cash Management
      </h1>
      <h2 className="font-normal lg:text-lg text-base mx-2 mb-2">
        Audit and control cash levels
      </h2>
    </div>
  );
};

export default CashManagement;
