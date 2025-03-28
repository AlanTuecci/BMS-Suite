import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { onRecordDeposit, onGetLatestDeposits, onGetNumDeposits } from "../api/auth";
import { AuthContext } from "../context/AuthContext";

function RegisterDeposits() {
  const { authState } = useContext(AuthContext);
  const { userType, cashAccessLevel } = authState;
  const navigate = useNavigate();

  const [deposits, setDeposits] = useState([]);
  const [numDeposits, setNumDeposits] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const [depositBox, setDepositBox] = useState(false);

  const [depositAmount, setDepositAmount] = useState(0);
  const [depositorEmployeeID, setDepositorEmployeeID] = useState(0);
  const [depositeeEmployeeID, setDepositeeEmployeeID] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const depositsPerPage = 6;

  const fetchDeposits = async () => {
    try {
      setLoading(true);
      const minEntryNum = (currentPage - 1) * depositsPerPage;
      let response = await onGetLatestDeposits(userType, {
        num_entries: depositsPerPage,
        min_entry_num: minEntryNum,
      });
      setDeposits(response.data);
      response = await onGetNumDeposits();
      setNumDeposits(response.data.count);
    } catch (err) {
      console.log(`Error fetching register deposits: ${err}`);
      setError("Failed to fetch register deposits.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userType) {
      fetchDeposits();
    }
  }, [userType, currentPage]);

  const handleRecordDeposits = async (e) => {
    e.preventDefault();
    try {
      const depositData = {
        deposit_amount: depositAmount,
        depositor_employee_id: depositorEmployeeID,
        depositee_employee_id: depositeeEmployeeID,
      };

      await onRecordDeposit(userType, depositData);

      setDepositAmount(0);
      setDepositorEmployeeID(0);
      setDepositeeEmployeeID(0);

      setSuccessMessage("Register deposits recorded successfully!");
      setDepositBox(false);

      fetchDeposits();
    } catch (error) {
      console.error(`Error recording register deposits: ${error}`);
      alert("Failed to record register deposits. Please try again.");
    }
  };

  const navigateToDeposit = (deposit) => {
    navigate(`/bms-suite/update-deposit`, { state: { deposit_id: deposit.deposit_id } });
  };

  const totalPages = Math.ceil(numDeposits / depositsPerPage);

  if (loading) return <p className="text-center text-gray-600">Loading register deposits...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      <div className="flex-grow p-8 ml-16">
        <div className="flex">
          <h1 className="w-1/2 text-5xl font-light text-gray-800 mb-4 leading-tight justify-start">
            Register Deposits
          </h1>
          <div className="w-1/2 justify-end mb-6 flex align-bottom items-center gap-4">
            {(userType === "company" || cashAccessLevel > 1) && (
              <button
                className="bg-compblue text-white px-4 py-2 rounded-lg hover:bg-lighter_purple"
                onClick={() => navigate(`/bms-suite/cash-control`)}
              >
                Safe Counts
              </button>
            )}
          </div>
        </div>
        <p className="text-gray-600 mb-6">Track and manage your register deposits here.</p>

        <div className="mb-6 flex items-center gap-4">
          {(userType === "company" || cashAccessLevel > 1) && (
            <button
              className="bg-compblue text-white px-4 py-2 rounded-lg hover:bg-lighter_purple"
              onClick={() => setDepositBox(true)}
            >
              + Record Deposit
            </button>
          )}
        </div>

        <div className="font-mono text-gray-800">
          <div className="mb-4 w-full flex bg-gray-100 rounded-lg p-3">
            <span className="w-1/5 font-semibold text-center">Deposit ID</span>
            <span className="w-1/5 font-semibold text-center" style={{ whiteSpace: "nowrap" }}>
              Time Stamp
            </span>
            <span className="w-1/5 font-semibold text-center" style={{ whiteSpace: "nowrap" }}>
              Deposit Amount
            </span>
            <span className="w-1/5 font-semibold text-center" style={{ whiteSpace: "nowrap" }}>
              Depositor Employee ID
            </span>
            <span className="w-1/5 font-semibold text-center" style={{ whiteSpace: "nowrap" }}>
              Depositee Employee ID
            </span>
            <span className="w-1/5 text-right font-semibold">Options</span>
          </div>

          {deposits.map((deposit, index) => (
            <div
              key={deposit.deposit_id}
              className={`mb-2 w-full flex items-center p-3 ${index % 2 === 0 ? "" : "bg-gray-100 rounded-md"}`}
            >
              <span className="w-1/5 text-center">{deposit.deposit_id}</span>
              <span className="w-1/5 text-center" style={{ whiteSpace: "nowrap" }}>
                {new Date(deposit.deposit_timestamp).toLocaleString()}
              </span>
              <span className="w-1/5 text-center" style={{ whiteSpace: "nowrap" }}>
                {deposit.deposit_amount}
              </span>
              <span className="w-1/5 text-center" style={{ whiteSpace: "nowrap" }}>
                {deposit.depositor_employee_id}
              </span>
              <span className="w-1/5 text-center" style={{ whiteSpace: "nowrap" }}>
                {deposit.depositee_employee_id}
              </span>
              <div className="w-1/5 text-right">
                <button
                  className="text-blue-600 ml-2 text-2xl hover:text-blue-800"
                  onClick={() => navigateToDeposit(deposit)}
                >
                  ⋮
                </button>
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center p-8 pb-15 ml-16">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={`px-4 py-2 mx-1 rounded ${
                  currentPage === index + 1
                    ? "bg-compblue text-white"
                    : "bg-white text-compblue border-1 border-compblue"
                }`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}

        {depositBox && (
          <div className="fixed inset-0 z-20 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="rounded-lg p-4 bg-white w-[25em]">
              <form onSubmit={handleRecordDeposits}>
                <h2 className="text-lg font-medium mb-2">Record Register Deposits</h2>

                <div className="mb-2">
                  <div>
                    <label>Deposit Amount</label>
                    <textarea
                      name="depositAmount"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                      className="border border-gray-300 w-full px-2 py-1 rounded-md"
                    />
                  </div>
                  <div>
                    <label>Depositor Employee ID</label>
                    <textarea
                      name="depositorEmployeeId"
                      value={depositorEmployeeID}
                      onChange={(e) => setDepositorEmployeeID(e.target.value)}
                      className="border border-gray-300 w-full px-2 py-1 rounded-md"
                    />
                  </div>
                  <div>
                    <label>Depositee Employee ID</label>
                    <textarea
                      name="depositeeEmployeeId"
                      value={depositeeEmployeeID}
                      onChange={(e) => setDepositeeEmployeeID(e.target.value)}
                      className="border border-gray-300 w-full px-2 py-1 rounded-md"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setDepositBox(false)}
                    className="px-3 py-1 border-2 border-compblue text-compblue bg-white rounded-md"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="px-3 py-1 bg-compblue text-white rounded-md hover:bg-lighter_purple">
                    Record Deposit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RegisterDeposits;
