import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import PrdBox from "../components/PrdBox";
import PrdSearch from "../components/PrdSearch";
import { onGetAllProductSKUs } from "../api/auth";

function ProductManagement() {
  const [prdBx, setPrdBx] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const fetchProducts = async () => {
    try {
      const response = await onGetAllProductSKUs();
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.product_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.product_sku.toString().includes(searchTerm)
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  
  if (loading)
    return <p className="text-center text-gray-600">Loading products...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!products.length)
    return <p className="text-center text-gray-600">No products found.</p>;

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 transition-all duration-300 ${
          isSidebarOpen ? "w-64" : "w-16"
        }`}
      >
        <div className="p-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-2xl text-white"
          >
            {isSidebarOpen ? "Close" : "Open"}
          </button>
        </div>
        <Sidebar isSidebarOpen={isSidebarOpen} />
      </div>

      {/* Main Content */}
      <div
        className={`flex-grow p-8 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-16"
        }`}
      >
        <h1 className="text-5xl font-light text-gray-800 mb-4 mt-4 leading-tight">
          Product Inventory
        </h1>
        <p className="text-gray-600 mb-6">
          Track and manage your product inventory here.
        </p>

        {/* Search Bar and Button */}
        <div className="mb-6 flex items-center gap-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Products..."
            className="w-1/4 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button
            className="bg-compblue text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            onClick={() => setPrdBx(true)}
          >
            + Create Product
          </button>
        </div>

        {/* Product Table */}
        <div className="font-mono text-gray-800">
          <div className="mb-4 text-gray-800 w-full flex bg-gray-100 rounded-lg p-3">
            <span className="w-1/2 font-semibold">Product SKU</span>
            <span className="w-1/2 font-semibold">Product Name</span>
          </div>

          {filteredProducts.map((product, index) => (
            <div
              key={product.product_sku}
              className={`mb-2 w-full flex items-center p-2 ${
                index % 2 === 0 ? "" : "bg-gray-100 rounded-md"
              }`}
            >
              <span className="w-1/2">#{product.product_sku}</span>
              <span className="w-1/2">{product.product_name || "N/A"}</span>
            </div>
          ))}
        </div>

        {/* Modal for Product Creation */}
        {prdBx && (
          <PrdBox
            closePrdBx={() => setPrdBx(false)}
            refreshProducts={fetchProducts}
          />
        )}
      </div>
    </div>
  );
}

export default ProductManagement;
