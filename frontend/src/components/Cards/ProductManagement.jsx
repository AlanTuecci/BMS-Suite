import React from "react";
import { LuClipboardEdit } from "react-icons/lu";

const ProductManagement = () => {
  return (
    <div className="2xl:max-w-[50%] lg:max-w-[33%] sm:max-w-[50%] max-w-[80%] rounded-lg mt-8 mx-4 p-4 border-2 border-white">
      <LuClipboardEdit size={65} className="mt-2 mb-4"/>
      <h1 className="font-bold lg:text-2xl text-lg mx-2 mt-2">Product Management</h1>
      <h2 className="font-normal lg:text-lg text-base mx-2 mb-2">Supervise and review product levels</h2>
    </div>
  );
};

export default ProductManagement;
