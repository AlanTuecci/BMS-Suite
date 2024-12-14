import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../components/Sidebar";


const Deposit = () => {

  const [activeModal, setActiveModal] = useState(null); 
  const handleCloseModal = () => setActiveModal(null);

  return (
    <div class= "flex flex-col md:flex-row h-screen bg-bkgdb overflow-x-auto relative">
      <Sidebar/>
      <div class="flex flex-col flex-grow p-4 ">
        <div className="md:mb-8 mt-[-6px]">
            <h2 className="text-2xl md:text-3xl font-bold text-[#14213D] px-5">Deposits</h2>
            <p className="text-sm md:text-lg text-gray-600 px-5">Track and manage your deposits today</p>
        </div>

        <div className="mb-6 mt-5 flex gap-4">
          <button
            className="bg-compblue text-white px-4 py-2 ml-auto rounded-lg hover:bg-blue-700 " onClick={() => setActiveModal("recordDeposit")}
          >
            + Record Deposits
          </button>
        </div>

        {/* Modal button */}
        {activeModal === "recordDeposit" && (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white w-1/2 max-w-lg rounded-2xl shadow-lg p-8 relative">
              <button
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-xl"
                onClick={handleCloseModal}
              >
                &times;
              </button>
              <h3 className="text-2xl font-semibold mb-4 border-b-2 border-light_gray">Deposit Info</h3>

              <div class = "flex flex-col "> 

                <div class="flex items-center mb-2">
                  <h2 class="text-lg font-semibold "> Desposit ID: </h2>
                  <p className="text-gray-700 ml-auto"> Bob Jones </p>
                </div>

                <div class = "flex items-center mb-2">
                  <h2 class="text-lg font-semibold"> Desposit Amount: </h2>
                  <p className="text-gray-700 ml-auto"> Bob Jones </p>
                </div>
                <div class = "flex items-center mb-2">
                  <h2 class="text-lg font-semibold"> Despositor ID: </h2>
                  <p className="text-gray-700 ml-auto"> Bob Jones </p>
                </div>
                  
                <div class = "flex items-center mb-4" >
                  <h2 class="text-lg font-semibold"> Despositee ID: </h2>
                  <p className="text-gray-700 ml-auto"> Bob Jones </p>
                </div>
                  
              </div>
              <div class=" flex gap-x-4">
                <button className="border-2 border-red text-red px-4 py-2 rounded-lg hover:bg-blue-700 ml-auto" onClick={handleCloseModal}>
                  Delete
                </button>
                <button className="bg-compblue text-white px-4 py-2 rounded-lg" onClick={() => setActiveModal("editDeposit")}>
                  Update
                </button>
              </div>
              
            </div>
          </div>
        )}

        {activeModal === "editDeposit" && (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white w-1/2 max-w-lg rounded-2xl shadow-lg p-8 relative">
              <button
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-xl"
                onClick={handleCloseModal}
              >
                &times;
              </button>
              <h3 className="text-2xl font-semibold mb-4 border-b-2 border-light_gray">Edit Deposit Info</h3>

              <div class = "flex flex-col "> 

                <div class="flex items-center mb-2">
                  <h2 class="text-lg font-semibold "> Desposit ID: </h2>
                  <p className="text-gray-700 ml-auto"> Bob Jones </p>
                </div>

                <div class = "flex items-center mb-2">
                  <h2 class="text-lg font-semibold"> Desposit Amount: </h2>
                  <p className="text-gray-700 ml-auto"> Bob Jones </p>
                </div>
                <div class = "flex items-center mb-2">
                  <h2 class="text-lg font-semibold"> Despositor ID: </h2>
                  <p className="text-gray-700 ml-auto"> Bob Jones </p>
                </div>
                  
                <div class = "flex items-center mb-4" >
                  <h2 class="text-lg font-semibold"> Despositee ID: </h2>
                  <p className="text-gray-700 ml-auto"> Bob Jones </p>
                </div>
                  
              </div>
              
              <div class=" flex gap-x-4">
                <button className="border-2 border-compblue text-compblue px-4 py-2 rounded-lg hover:bg-blue-700 ml-auto" onClick={handleCloseModal}>
                  Cancel
                </button>
                <button className="bg-compblue text-white px-4 py-2 rounded-lg" onClick={handleCloseModal}>
                  Save Changes
                </button>
              </div>
              
            </div>
          </div>
        )}
        
          <div class="-m-1.5 overflow-x-auto min-w-full pl-10">
            <div class="p-1.5  align-middle">
              <div class="border rounded-lg overflow-hidden">
                <table class="min-w-full divide-y px-5">
                  <thead class ="bg-light_gray">
                    <tr>
                      <th class="px-6 py-3 text-start text-base font-medium text-light_darker_gray">Deposit ID</th>
                      <th class="px-6 py-3 text-start text-base font-medium text-light_darker_gray">Deposit Amount</th>
                      <th class="px-6 py-3 text-start text-base font-medium text-light_darker_gray">Deposit Timestamp</th>
                      <th class="px-6 py-3 text-start text-base font-medium text-light_darker_gray">Depositor ID</th>
                      <th class="px-6 py-3 text-start text-base font-medium text-light_darker_gray">Depositee ID</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200">
                    <tr class="cursor-pointer hover:bg-lighter_gray" onClick={() => setActiveModal("recordDeposit")}>
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium ">1</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm">$55</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm">11:12 am 09/21/2024 </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm">98</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm">26</td>
                    </tr>
                    <tr class="cursor-pointer hover:bg-lighter_gray" onClick={() => setActiveModal("recordDeposit")}>
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium ">2</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm">$127</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm">11:13 pm 12/14/2024 </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm">21</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm">7</td>
                    </tr>
                    <tr class="cursor-pointer hover:bg-lighter_gray" onClick={() => setActiveModal("recordDeposit")}>
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">3</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm">$20</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm">9:24 pm 12/14/2024 </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm ">5</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm ">10</td>
                    </tr>
                    <tr class="cursor-pointer hover:bg-lighter_gray" onClick={() => setActiveModal("recordDeposit")}>
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">4</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm">$110.60 </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm ">11:13 am 10/13/2024 </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm  ">90</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm ">24</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      </div>
  )
}

export default Deposit
