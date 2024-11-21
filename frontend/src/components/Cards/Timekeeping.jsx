import React from "react";
import { AiOutlineFieldTime } from "react-icons/ai";

const Timekeeping = () => {
  return (
    <div className="2xl:max-w-[50%] lg:max-w-[33%] sm:max-w-[50%] max-w-[80%] rounded-lg mt-8 mx-4 p-4 border-2 border-white">
      <AiOutlineFieldTime size={80} />
      <h1 className="font-bold lg:text-2xl text-lg mx-2 mt-2">Timekeeping</h1>
      <h2 className="font-normal lg:text-lg text-base mx-2 mb-2">
        Record and track work hours
      </h2>
    </div>
  );
};

export default Timekeeping;
