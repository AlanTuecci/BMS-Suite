import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { onGetAllLatestProductCounts, onAddProduct } from "../api/auth";
import { AuthContext } from "../context/AuthContext";

function InventorySummary() {
  const { authState } = useContext(AuthContext);
  const userType = authState.userType;
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [prdBx, setPrdBx] = useState(false);
  const [productSku, setProductSku] = useState("");
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await onGetAllLatestProductCounts(userType);
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to fetch product data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userType) {
      fetchProducts();
    }
  }, [userType]);

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.product_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.product_sku.toString().includes(searchTerm)
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        product_sku: productSku,
        product_name: productName,
        product_description: productDescription,
      };

      await onAddProduct(productData);
      setSuccessMessage("Product added successfully!");
      setPrdBx(false);
      fetchProducts();
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please try again.");
    }
  };

  const navigateToProductCount = (product) => {
    navigate(`/product-count`, { state: { productSku: product.product_sku } });
  };  

  if (loading) return <p className="text-center text-gray-600">Loading products...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      <div className="flex-grow p-8 ml-16">
        <h1 className="text-5xl font-light text-gray-800 mb-4 leading-tight">
          Inventory Summary
        </h1>
        <p className="text-gray-600 mb-6">
          Track and manage your product inventory here.
        </p>

        <div className="mb-6 flex items-center gap-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Products..."
            className="w-1/4 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          {userType === "company" && (
            <button
              className="bg-compblue text-white px-4 py-2 rounded-lg hover:bg-lighter_purple"
              onClick={() => setPrdBx(true)}
            >
              + Create Product
            </button>
          )}
        </div>

        <div className="font-mono text-gray-800">
          {/* Table Header */}
          <div className="mb-4 w-full flex bg-gray-100 rounded-lg p-3">
            <span className="w-1/5 font-semibold text-center">Product SKU</span>
            <span className="w-1/5 font-semibold text-center">Product Name</span>
            <span className="w-1/5 font-semibold text-center">Employee ID</span>
            <span className="w-1/5 font-semibold text-center" style={{ whiteSpace: "nowrap" }}>
              Time Stamp
            </span>
            <span className="w-1/5 font-semibold text-center">Counts (Loose | Tray | Case)</span>
            <span className="w-1/5 text-right font-semibold">Options</span>
          </div>

          {/* Table Rows */}
          {filteredProducts.map((product, index) => (
            <div
              key={product.product_sku}
              className={`mb-2 w-full flex items-center p-2 ${
                index % 2 === 0 ? "" : "bg-gray-100 rounded-md"
              }`}
            >
              <span className="w-1/5 text-center">#{product.product_sku}</span>
              <span className="w-1/5 text-center">{product.product_name}</span>
              <span className="w-1/5 text-center">{product.employee_id}</span>
              <span className="w-1/5 text-center" style={{ whiteSpace: "nowrap" }}>
                {new Date(product.count_timestamp).toLocaleString()}
              </span>
              <span className="w-1/5 text-center">
                {product.on_hand_loose_unit_count} | {product.on_hand_tray_count} |{" "}
                {product.on_hand_case_count}
              </span>
              <div className="w-1/5 text-right">
                <button
                  className="text-blue-600 ml-2 text-2xl hover:text-blue-800"
                  onClick={() => navigateToProductCount(product)}
                >
                  ⋮
                </button>
              </div>
            </div>
          ))}
        </div>

        {prdBx && (
          <div className="fixed inset-0 z-20 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="rounded-lg p-8 bg-white w-[25em]">
              <form onSubmit={handleAddProduct}>
                <h2 className="text-xl font-medium mb-4">Create Product</h2>
                <div className="mb-4">
                  <label>Product SKU</label>
                  <input
                    type="text"
                    name="productSku"
                    value={productSku}
                    onChange={(e) => setProductSku(e.target.value)}
                    className="border border-gray-300 w-full px-3 py-2 rounded-md"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label>Product Name</label>
                  <input
                    type="text"
                    name="productName"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="border border-gray-300 w-full px-3 py-2 rounded-md"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label>Product Description</label>
                  <textarea
                    name="productDescription"
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                    className="border border-gray-300 w-full px-3 py-2 rounded-md"
                  />
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setPrdBx(false)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
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
}

export default InventorySummary;