import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { onRecordSafeCount, onGetLatestSafeCounts, onGetNumSafeCounts } from "../api/auth";
import { AuthContext } from "../context/AuthContext";

function SafeCounts() {
  const { authState } = useContext(AuthContext);
  const { userType, cashAccessLevel } = authState;
  const navigate = useNavigate();

  const [safeCounts, setSafeCounts] = useState([]);
  const [numCounts, setNumCounts] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const [countBox, setCountBox] = useState(false);

  const [draws, setDraws] = useState(0);
  const [coinChange, setCoinChange] = useState(0);
  const [pennies, setPennies] = useState(0);
  const [nickels, setNickels] = useState(0);
  const [dimes, setDimes] = useState(0);
  const [quarters, setQuarters] = useState(0);
  const [singles, setSingles] = useState(0);
  const [doubles, setDoubles] = useState(0);
  const [fives, setFives] = useState(0);
  const [tens, setTens] = useState(0);
  const [twenties, setTwenties] = useState(0);
  const [fifties, setFifties] = useState(0);
  const [hundreds, setHundreds] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const countsPerPage = 6;

  const fetchCounts = async () => {
    try {
      setLoading(true);
      const minEntryNum = (currentPage - 1) * countsPerPage;
      let response = await onGetLatestSafeCounts(userType, {
        num_entries: countsPerPage,
        min_entry_num: minEntryNum,
      });
      setSafeCounts(response.data);
      response = await onGetNumSafeCounts();
      setNumCounts(response.data.count);
    } catch (err) {
      console.log(`Error fetching safe counts: ${err}`);
      setError("Failed to fetch safe counts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userType) {
      fetchCounts();
    }
  }, [userType, currentPage]);

  const handleRecordCounts = async (e) => {
    e.preventDefault();
    try {
      const countData = {
        draws: draws,
        coin_change: coinChange,
        pennies: pennies,
        nickels: nickels,
        dimes: dimes,
        quarters: quarters,
        singles: singles,
        doubles: doubles,
        fives: fives,
        tens: tens,
        twenties: twenties,
        fifties: fifties,
        hundreds: hundreds,
      };

      await onRecordSafeCount(userType, countData);

      setDraws(0);
      setCoinChange(0);
      setPennies(0);
      setNickels(0);
      setDimes(0);
      setQuarters(0);
      setSingles(0);
      setDoubles(0);
      setFives(0);
      setTens(0);
      setTwenties(0);
      setFifties(0);
      setHundreds(0);

      setSuccessMessage("Safe counts recorded successfully!");
      setCountBox(false);

      fetchCounts();
    } catch (error) {
      console.error(`Error recording safe counts: ${error}`);
      alert("Failed to record safe counts. Please try again.");
    }
  };

  const navigateToSafeCount = (count) => {
    navigate(`/bms-suite/update-safe-count`, { state: { count } });
  };

  const totalPages = Math.ceil(numCounts / countsPerPage);

  if (loading) return <p className="text-center text-gray-600">Loading safe counts...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      <div className="flex-grow p-8 ml-16">
        <div className="flex">
          <h1 className="w-1/2 text-5xl font-light text-gray-800 mb-4 leading-tight justify-start">Safe Counts</h1>
          <div className="w-1/2 justify-end mb-6 flex align-bottom items-center gap-4">
            {(userType === "company" || cashAccessLevel > 1) && (
              <button
                className="bg-compblue text-white px-4 py-2 rounded-lg hover:bg-lighter_purple"
                onClick={() => navigate(`/bms-suite/register-deposit`)}
              >
                Register Deposits
              </button>
            )}
          </div>
        </div>
        <p className="text-gray-600 mb-6">Track and manage your safe counts here.</p>

        <div className="mb-6 flex items-center gap-4">
          {(userType === "company" || cashAccessLevel > 1) && (
            <button
              className="bg-compblue text-white px-4 py-2 rounded-lg hover:bg-lighter_purple"
              onClick={() => setCountBox(true)}
            >
              + Record Safe Counts
            </button>
          )}
        </div>

        <div className="font-mono text-gray-800">
          <div className="mb-4 w-full flex bg-gray-100 rounded-lg p-3">
            <span className="w-32 font-semibold text-center">Employee ID</span>
            <span className="w-52 font-semibold text-center" style={{ whiteSpace: "nowrap" }}>
              Time Stamp
            </span>
            <span className="w-64 font-semibold text-center" style={{ whiteSpace: "nowrap" }}>
              (Draws | Coin Change)
            </span>
            <span className="w-96 font-semibold text-center" style={{ whiteSpace: "nowrap" }}>
              (Pennies | Nickels | Dimes | Quarters)
            </span>
            <span className="w-1/3 font-semibold text-center" style={{ whiteSpace: "nowrap" }}>
              (1s | 2s | 5s | 10s | 20s | 50s | 100s)
            </span>
            <span className="w-1/12 text-right font-semibold">Options</span>
          </div>

          {safeCounts.map((count, index) => (
            <div
              key={count.count_id}
              className={`mb-2 w-full flex items-center p-3 ${index % 2 === 0 ? "" : "bg-gray-100 rounded-md"}`}
            >
              <span className="w-32 text-center">{count.employee_id}</span>
              <span className="w-52 text-center" style={{ whiteSpace: "nowrap" }}>
                {new Date(count.count_timestamp).toLocaleString()}
              </span>
              <span className="w-64 text-center" style={{ whiteSpace: "nowrap" }}>
                {count.draws} | {count.coin_change}
              </span>
              <span className="w-96 text-center" style={{ whiteSpace: "nowrap" }}>
                {count.pennies} | {count.nickels} | {count.dimes} | {count.quarters}
              </span>
              <span className="w-1/3 text-center" style={{ whiteSpace: "nowrap" }}>
                {count.singles} | {count.doubles} | {count.fives} | {count.tens} | {count.twenties} | {count.fifties} |{" "}
                {count.hundreds}
              </span>
              <div className="w-1/12 text-right">
                <button
                  className="text-blue-600 ml-2 text-2xl hover:text-blue-800"
                  onClick={() => navigateToSafeCount(count)}
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

        {countBox && (
          <div className="fixed inset-0 z-20 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="rounded-lg p-4 bg-white w-[40em]">
              <form onSubmit={handleRecordCounts}>
                <h2 className="text-lg font-medium mb-2">Record Safe Counts</h2>

                <div className="mb-2 grid grid-cols-2 gap-2">
                  <div className="col-span-2">
                    <label>Draws</label>
                    <input
                      type="text"
                      name="draws"
                      value={draws}
                      onChange={(e) => setDraws(e.target.value)}
                      className="border border-gray-300 w-full px-2 py-1 rounded-md"
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <label>Coin Change</label>
                    <input
                      type="text"
                      name="coinChange"
                      value={coinChange}
                      onChange={(e) => setCoinChange(e.target.value)}
                      className="border border-gray-300 w-full px-2 py-1 rounded-md"
                      required
                    />
                  </div>
                </div>

                <div className="mb-2 grid grid-cols-2 gap-2">
                  <div>
                    <label>Pennies</label>
                    <textarea
                      name="pennies"
                      value={pennies}
                      onChange={(e) => setPennies(e.target.value)}
                      className="border border-gray-300 w-full px-2 py-1 rounded-md"
                    />
                  </div>
                  <div>
                    <label>Nickels</label>
                    <textarea
                      name="nickels"
                      value={nickels}
                      onChange={(e) => setNickels(e.target.value)}
                      className="border border-gray-300 w-full px-2 py-1 rounded-md"
                    />
                  </div>
                  <div>
                    <label>Dimes</label>
                    <textarea
                      name="dimes"
                      value={dimes}
                      onChange={(e) => setDimes(e.target.value)}
                      className="border border-gray-300 w-full px-2 py-1 rounded-md"
                    />
                  </div>
                  <div>
                    <label>Quarters</label>
                    <textarea
                      name="quarters"
                      value={quarters}
                      onChange={(e) => setQuarters(e.target.value)}
                      className="border border-gray-300 w-full px-2 py-1 rounded-md"
                    />
                  </div>
                </div>

                <div className="mb-2 grid grid-cols-2 gap-2">
                  <div>
                    <label>1s</label>
                    <textarea
                      name="singles"
                      value={singles}
                      onChange={(e) => setSingles(e.target.value)}
                      className="border border-gray-300 w-full px-2 py-1 rounded-md"
                    />
                  </div>
                  <div>
                    <label>2s</label>
                    <textarea
                      name="doubles"
                      value={doubles}
                      onChange={(e) => setDoubles(e.target.value)}
                      className="border border-gray-300 w-full px-2 py-1 rounded-md"
                    />
                  </div>
                  <div>
                    <label>5s</label>
                    <textarea
                      name="fives"
                      value={fives}
                      onChange={(e) => setFives(e.target.value)}
                      className="border border-gray-300 w-full px-2 py-1 rounded-md"
                    />
                  </div>
                  <div>
                    <label>10s</label>
                    <textarea
                      name="tens"
                      value={tens}
                      onChange={(e) => setTens(e.target.value)}
                      className="border border-gray-300 w-full px-2 py-1 rounded-md"
                    />
                  </div>
                  <div>
                    <label>20s</label>
                    <textarea
                      name="twenties"
                      value={twenties}
                      onChange={(e) => setTwenties(e.target.value)}
                      className="border border-gray-300 w-full px-2 py-1 rounded-md"
                    />
                  </div>
                  <div>
                    <label>50s</label>
                    <textarea
                      name="fifties"
                      value={fifties}
                      onChange={(e) => setFifties(e.target.value)}
                      className="border border-gray-300 w-full px-2 py-1 rounded-md"
                    />
                  </div>
                  <div>
                    <label>100s</label>
                    <textarea
                      name="hundreds"
                      value={hundreds}
                      onChange={(e) => setHundreds(e.target.value)}
                      className="border border-gray-300 w-full px-2 py-1 rounded-md"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setCountBox(false)}
                    className="px-3 py-1 border-2 border-compblue text-compblue bg-white rounded-md"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="px-3 py-1 bg-compblue text-white rounded-md hover:bg-lighter_purple">
                    Record Counts
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

export default SafeCounts;
