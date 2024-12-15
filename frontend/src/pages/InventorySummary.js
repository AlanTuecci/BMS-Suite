import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { onGetAllLatestProductCounts, onAddProduct } from "../api/auth";
import { AuthContext } from "../context/AuthContext";

const InventorySummary = () => {
  const { authState } = useContext(AuthContext);
  const { userType } = authState;
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateProductModal, setShowCreateProductModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    product_sku: "",
    product_name: "",
    product_description: "",
  });
  const [feedbackMessage, setFeedbackMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userType) {
      fetchProducts();
    }
  }, [userType]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await onGetAllLatestProductCounts(userType);
      setProducts(response.data);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Unable to fetch product data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.product_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.product_sku?.toString().includes(searchTerm)
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      await onAddProduct(newProduct);
      setFeedbackMessage("Product created successfully!");
      setShowCreateProductModal(false);
      fetchProducts();
    } catch (err) {
      console.error("Error creating product:", err);
      setFeedbackMessage("Failed to create product. Please try again.");
    }
  };

  const navigateToProductDetails = (sku) => {
    navigate(`/product-count`, { state: { productSku: sku } });
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-grow px-10 py-8">
        <header className="mb-6">
          <h1 className="text-4xl font-semibold text-gray-800">Inventory Summary</h1>
          <p className="text-gray-600 mt-2">Manage and track your product inventory.</p>
        </header>

        {feedbackMessage && (
          <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-lg">
            {feedbackMessage}
          </div>
        )}

        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            className="border border-gray-300 rounded-md px-4 py-2 w-1/3 focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Search by SKU or Name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {userType === "company" && (
            <button
              onClick={() => setShowCreateProductModal(true)}
              className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700"
            >
              + Add New Product
            </button>
          )}
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading products...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="bg-white rounded-md shadow overflow-hidden">
            <table className="min-w-full text-left text-gray-800">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="py-3 px-6">SKU</th>
                  <th className="py-3 px-6">Name</th>
                  <th className="py-3 px-6">Employee</th>
                  <th className="py-3 px-6">Timestamp</th>
                  <th className="py-3 px-6">Counts</th>
                  <th className="py-3 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product, index) => (
                  <tr
                    key={product.product_sku}
                    className={`border-b ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="py-3 px-6">{product.product_sku}</td>
                    <td className="py-3 px-6">{product.product_name}</td>
                    <td className="py-3 px-6">{product.employee_id || "N/A"}</td>
                    <td className="py-3 px-6">
                      {new Date(product.count_timestamp).toLocaleString()}
                    </td>
                    <td className="py-3 px-6">
                      {product.on_hand_loose_unit_count} | {product.on_hand_tray_count} | {" "}
                      {product.on_hand_case_count}
                    </td>
                    <td className="py-3 px-6 text-right">
                      <button
                        onClick={() => navigateToProductDetails(product.product_sku)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {showCreateProductModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg w-96 shadow-lg">
              <h2 className="text-xl font-medium mb-4">Add New Product</h2>
              <form onSubmit={handleCreateProduct}>
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-medium">Product SKU</label>
                  <input
                    type="text"
                    name="product_sku"
                    value={newProduct.product_sku}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-medium">Product Name</label>
                  <input
                    type="text"
                    name="product_name"
                    value={newProduct.product_name}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-medium">Product Description</label>
                  <textarea
                    name="product_description"
                    value={newProduct.product_description}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                  />
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateProductModal(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Add Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InventorySummary;