import React, { useState, useRef, useEffect, useContext } from "react";
import Sidebar from "../components/Sidebar";
import { AuthContext } from "../context/AuthContext";
import {recordDeposits, getLatestDeposits} from "../api/auth";
import { useNavigate } from "react-router-dom";

const Deposit = () => {
  
  const { authState } = useContext(AuthContext);
const data = authState?.data || {};  // Safely access authState.data
const [activeModal, setActiveModal] = useState(null);
const [loading, setLoading] = useState(true);
const [filteredDeposits, setFilteredDeposits] = useState([]);  // Make sure this is an array
const [depositAmount, setdepositAmount] = useState(0.0);  // Deposit amount as a number (default 0.0)
const [depositorId, setdepositorId] = useState(0);  // Depositor ID as a number (default 0)
const [depositeeId, setdepositeeId] = useState(0);  // Depositee ID as a number (default 0)
const [error, setError] = useState(null);
const [successMessage, setSuccessMessage] = useState("");  // Message for success
const [depositBox, setDepositBox] = useState(false);  // Control deposit modal visibility
const [depositId, setDepositId] = useState(0);  // Deposit ID as a number (default 0)

const handleCloseModal = () => setActiveModal(null);
const navigate = useNavigate();


  const fetchDeposits = async () => {
    try {
      setLoading(true);
      const response = await getLatestDeposits(data); // Assuming this returns an array of deposits
      setFilteredDeposits(response.data); // Set the array of deposits here
    } catch (error) {
      console.error("Error fetching data", error);
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };
  

  const handleAddDeposit =  async (e) => {
    e.preventDefault();
    try{
        const depositData = {
            deposit_amount: depositAmount,
            depositor_id: depositorId,
            depositee_employee_id: depositeeId,
            depositor_employee_id: depositId,
        }; 
        await recordDeposits(depositData) //do i use this or does there need to be a route for Adding the deposit record?
        setSuccessMessage("Product added successfully!");
        setDepositBox(false);
        fetchDeposits();
    }   catch (error){
        console.error("Error adding deposit record:", error);
        alert("Failed to add deposit record. Please try again.");
    }
  }

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
            className="bg-compblue text-white px-4 py-2 ml-auto rounded-lg hover:bg-blue-700 " onClick={() => setDepositBox(true)}
          >
            + Record Deposits
          </button>
        </div>

        {/* Table */}
        <div class="-m-1.5 overflow-x-auto min-w-full pl-10">
            <div class="p-1.5  align-middle">
              <div class="border rounded-lg overflow-hidden">
                <table class="min-w-full divide-y px-5">
                  <thead class ="bg-light_darker_gray">
                    <tr>
                      <th class="px-6 py-3 text-start text-base font-medium text-txt_color">Deposit ID</th>
                      <th class="px-6 py-3 text-start text-base font-medium text-light_txt_color">Deposit Amount</th>
                      <th class="px-6 py-3 text-start text-base font-medium text-light_txt_color">Deposit Timestamp</th>
                      <th class="px-6 py-3 text-start text-base font-medium text-light_txt_color">Depositor ID</th>
                      <th class="px-6 py-3 text-start text-base font-medium text-light_txt_color">Depositee ID</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200">
                  {filteredDeposits.map((deposits) => (
                    <tr
                        key={deposits.deposit_Id}
                        class="cursor-pointer hover:bg-lighter_gray"
                        onClick={() => setDepositBox(true)}
                    >
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        # {deposits.deposit_Id}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {deposits.deposit_amount}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {new Date(deposits.deposit_timestamp).toLocaleString()}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {deposits.depositor_employee_id}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {deposits.depositee_employee_id}
                        </td>
                    </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Modal button */}
        {depositBox && (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white w-1/2 max-w-lg rounded-2xl shadow-lg p-8 relative">
              <button
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-xl"
                onClick={() => setDepositBox(false)}
              >
                &times;
              </button>

              <form onSubmit={handleAddDeposit}>
                <h3 className="text-2xl font-semibold mb-4 border-b-2 border-light_gray">Deposit Info</h3>
                <div class = "flex flex-col "> 
                    <div class="flex items-center mb-2">
                        <label class="text-lg font-semibold "> Desposit Amount: </label>
                        <input
                            name="depositAmount"
                            value={depositAmount}
                            onChange={(e) => setdepositAmount(e.target.value)}
                            class="text-gray-700 ml-auto"
                            required
                        />
                    </div>
                    <div class="flex items-center mb-2">
                        <label class="text-lg font-semibold "> Depositor ID: </label>
                        <input
                            name="depositorID"
                            value={depositorId}
                            onChange={(e) => setdepositorId(e.target.value)}
                            class="text-gray-700 ml-auto"
                            required
                        />
                    </div>
                    <div class="flex items-center mb-2">
                        <label class="text-lg font-semibold "> Depositee ID: </label>
                        <input
                        name="depositeeID"
                        value={depositeeId}
                        onChange={(e) => setdepositeeId(e.target.value)}
                        class="text-gray-700 ml-auto"
                        required
                        />
                    </div>
                </div>
              </form>

              <div class=" flex gap-x-4">
                <button className="border-2 border-red text-red px-4 py-2 rounded-lg hover:scale-105 ml-auto" onClick={() => setDepositBox(false)}
                >
                  Delete
                </button>
                <button type="submit" className="bg-compblue text-white px-4 py-2 rounded-lg hover:scale-105">
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
                <button className="border-2 border-compblue text-compblue px-4 py-2 rounded-lg hover:bg-bkgd ml-auto hover:scale-105" onClick={handleCloseModal}>
                  Cancel
                </button>
                <button className="bg-compblue text-white px-4 py-2 rounded-lg hover:scale-105" onClick={handleCloseModal}>
                  Save Changes
                </button>
              </div>
              
            </div>
          </div>
        )}
      </div>
  )
}

export default Deposit
