import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { AuthContext } from "../context/AuthContext";
import {
  onGetProductCountHistory,
  onRecordProductCounts,
  onUpdateProductCounts,
  onDeleteProductCounts,
  onGetNumProductCounts,
} from "../api/auth";

function ProductCount() {
  const { authState } = useContext(AuthContext);
  const { userType, inventoryAccessLevel } = authState;
  const location = useLocation();
  const navigate = useNavigate();
  const { productSku } = location.state || {};

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  const [recordModalOpen, setRecordModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  const [recordData, setRecordData] = useState({
    product_sku: productSku || "",
    on_hand_loose_unit_count: "",
    on_hand_tray_count: "",
    on_hand_case_count: "",
  });

  const [updateData, setUpdateData] = useState({
    product_sku: productSku || "",
    product_count_id: null,
    on_hand_loose_unit_count: "",
    on_hand_tray_count: "",
    on_hand_case_count: "",
  });

  const fetchTotalCounts = async () => {
    try {
      const response = await onGetNumProductCounts(productSku);
      const totalCount = parseInt(response.data.count, 10);
      const pages = Math.ceil(totalCount / itemsPerPage);
      setTotalPages(pages);
    } catch (err) {
      console.error("Error fetching total counts:", err);
      setError("Failed to fetch total counts.");
    }
  };

  const fetchProductHistory = async () => {
    try {
      setLoading(true);
      const minEntryNum = (currentPage - 1) * itemsPerPage;
      const response = await onGetProductCountHistory(userType, {
        product_sku: productSku,
        num_entries: itemsPerPage,
        min_entry_num: minEntryNum,
      });
      setHistory(response.data);
    } catch (err) {
      console.error("Error fetching history:", err);
      setError("Failed to fetch product history.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productSku) {
      fetchTotalCounts();
    }
  }, [productSku]);

  useEffect(() => {
    if (productSku) {
      fetchProductHistory();
    }
  }, [productSku, currentPage]);

  const handleRecordModalOpen = () => setRecordModalOpen(true);

  const handleRecordModalClose = () => {
    setRecordModalOpen(false);
    setRecordData({
      product_sku: productSku || "",
      on_hand_loose_unit_count: "",
      on_hand_tray_count: "",
      on_hand_case_count: "",
    });
  };

  const handleRecordInputChange = (e) => {
    setRecordData({
      ...recordData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRecordProductCount = async (e) => {
    e.preventDefault();
    try {
      await onRecordProductCounts(userType, recordData);
      setSuccessMessage("Product count recorded successfully!");
      fetchProductHistory();
      handleRecordModalClose();
    } catch (err) {
      console.error("Error recording product count:", err);
      setError("Failed to record product count.");
    }
  };

  const handleUpdateModalOpen = (entry) => {
    setUpdateModalOpen(true);
    setUpdateData({
      product_sku: entry.product_sku,
      product_count_id: entry.product_count_id,
      on_hand_loose_unit_count: entry.on_hand_loose_unit_count,
      on_hand_tray_count: entry.on_hand_tray_count,
      on_hand_case_count: entry.on_hand_case_count,
    });
  };

  const handleUpdateModalClose = () => {
    setUpdateModalOpen(false);
    setUpdateData({
      product_sku: productSku || "",
      product_count_id: null,
      on_hand_loose_unit_count: "",
      on_hand_tray_count: "",
      on_hand_case_count: "",
    });
  };

  const handleUpdateInputChange = (e) => {
    setUpdateData({
      ...updateData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateProductCount = async (e) => {
    e.preventDefault();
    try {
      await onUpdateProductCounts(userType, updateData);
      setSuccessMessage("Product count updated successfully!");
      fetchProductHistory();
      handleUpdateModalClose();
    } catch (err) {
      console.error("Error updating product count:", err);
      setError("Failed to update product count.");
    }
  };

  const handleDeleteProductCount = async () => {
    try {
      await onDeleteProductCounts(userType, {
        product_sku: updateData.product_sku,
        product_count_id: updateData.product_count_id,
      });
      setSuccessMessage("Product count deleted successfully!");
      fetchProductHistory();
      handleUpdateModalClose();
    } catch (err) {
      console.error("Error deleting product count:", err);
      setError("Failed to delete product count.");
    }
  };

  if (loading) return <p className="text-center text-gray-600">Loading history...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      <div className="flex-grow p-8 ml-16">
        <h1 className="text-4xl font-light text-gray-800 mb-6">Product Count History</h1>
        {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
        <div className="mb-6">
          <h2 className="text-2xl font-medium">Product SKU: #{productSku}</h2>
        </div>

        <div className="flex items-center gap-4 mb-6">
          {inventoryAccessLevel >= 1 && (
            <button
              className="bg-compblue text-white px-4 py-2 rounded-lg hover:bg-lighter_purple"
              onClick={handleRecordModalOpen}
            >
              Record Product Count
            </button>
          )}
          <button
            className="bg-white border-compblue border-2 text-compblue px-4 py-2 rounded-lg hover:bg-gray-400"
            onClick={() => navigate("/bms-suite/inventory-summary")}
          >
            Go Back
          </button>
        </div>

        <div className="font-mono text-gray-800">
          <div className="mb-4 w-full flex bg-gray-100 rounded-lg p-3">
            <span className="w-1/5 font-semibold text-center">Timestamp</span>
            <span className="w-1/5 font-semibold text-center">Employee ID</span>
            <span className="w-1/5 font-semibold text-center">Loose Units</span>
            <span className="w-1/5 font-semibold text-center">Trays</span>
            <span className="w-1/5 font-semibold text-center">Cases</span>
            {inventoryAccessLevel >= 2 && <span className="w-1/5 text-right font-semibold">Options</span>}
          </div>

          {history.map((entry, index) => (
            <div
              key={entry.product_count_id}
              className={`mb-2 w-full flex items-center p-2 ${index % 2 === 0 ? "" : "bg-gray-100 rounded-md"}`}
            >
              <span className="w-1/5 text-center">{new Date(entry.count_timestamp).toLocaleString()}</span>
              <span className="w-1/5 text-center">{entry.employee_id}</span>
              <span className="w-1/5 text-center">{entry.on_hand_loose_unit_count}</span>
              <span className="w-1/5 text-center">{entry.on_hand_tray_count}</span>
              <span className="w-1/5 text-center">{entry.on_hand_case_count}</span>
              {inventoryAccessLevel >= 2 && (
                <div className="w-1/5 text-right">
                  <button
                    className="text-blue-600 ml-2 text-2xl hover:text-blue-800"
                    onClick={() => handleUpdateModalOpen(entry)}
                  >
                    ⋮
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center mt-6 pb-4">
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

        {recordModalOpen && (
          <div className="fixed inset-0 z-20 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="rounded-lg p-8 bg-white w-[25em]">
              <form onSubmit={handleRecordProductCount}>
                <h2 className="text-xl font-medium mb-4">Record Product Count</h2>
                <div className="mb-4">
                  <label>Loose Unit Count</label>
                  <input
                    type="number"
                    name="on_hand_loose_unit_count"
                    value={recordData.on_hand_loose_unit_count}
                    onChange={handleRecordInputChange}
                    className="border border-gray-300 w-full px-3 py-2 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label>Tray Count</label>
                  <input
                    type="number"
                    name="on_hand_tray_count"
                    value={recordData.on_hand_tray_count}
                    onChange={handleRecordInputChange}
                    className="border border-gray-300 w-full px-3 py-2 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label>Case Count</label>
                  <input
                    type="number"
                    name="on_hand_case_count"
                    value={recordData.on_hand_case_count}
                    onChange={handleRecordInputChange}
                    className="border border-gray-300 w-full px-3 py-2 rounded-md"
                  />
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={handleRecordModalClose}
                    className="px-4 py-2 bg-white text-compblue border-2 border-compblue rounded-md"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="px-4 py-2 bg-compblue text-white rounded-md hover:bg-lighter_purple">
                    Record Count
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {updateModalOpen && (
          <div className="fixed inset-0 z-20 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="rounded-lg p-8 bg-white w-[25em]">
              <form onSubmit={handleUpdateProductCount}>
                <h2 className="text-xl font-medium mb-4">Update Product Count</h2>
                <div className="mb-4">
                  <label>Loose Unit Count</label>
                  <input
                    type="number"
                    name="on_hand_loose_unit_count"
                    value={updateData.on_hand_loose_unit_count}
                    onChange={handleUpdateInputChange}
                    className="border border-gray-300 w-full px-3 py-2 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label>Tray Count</label>
                  <input
                    type="number"
                    name="on_hand_tray_count"
                    value={updateData.on_hand_tray_count}
                    onChange={handleUpdateInputChange}
                    className="border border-gray-300 w-full px-3 py-2 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label>Case Count</label>
                  <input
                    type="number"
                    name="on_hand_case_count"
                    value={updateData.on_hand_case_count}
                    onChange={handleUpdateInputChange}
                    className="border border-gray-300 w-full px-3 py-2 rounded-md"
                  />
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={handleUpdateModalClose}
                    className="px-4 py-2 bg-white text-compblue border-compblue border-2 rounded-md"
                  >
                    Cancel
                  </button>
                  {inventoryAccessLevel >= 3 && (
                    <button
                      type="button"
                      onClick={handleDeleteProductCount}
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                      Delete
                    </button>
                  )}
                  <button type="submit" className="px-4 py-2 bg-compblue text-white rounded-md hover:bg-lighter_purple">
                    Update
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

export default ProductCount;
