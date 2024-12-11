import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { onGetAllProductSKUs, onAddProduct } from "../api/auth";

function ProductManagement() {
  const [prdBx, setPrdBx] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [productSku, setProductSku] = useState("");
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

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
      setErrors({});
      fetchProducts();
      setPrdBx(false);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const errorObj = {};
        error.response.data.errors.forEach((err) => {
          errorObj[err.path] = err.msg;
        });
        setErrors(errorObj);
      } else {
        console.error("Error adding product:", error);
        setErrors({ general: "Failed to add product" });
      }
    }
  };

  if (loading)
    return <p className="text-center text-gray-600">Loading products...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!products.length)
    return <p className="text-center text-gray-600">No products found.</p>;

  return (
    <div className="flex h-screen bg-white">
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

        {prdBx && (
          <div className="fixed inset-0 z-20 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="rounded-lg p-8 bg-white w-[25em]">
              <form onSubmit={handleAddProduct}>
                <div className="leading-tight">
                  <h2 className="px-3 text-xl font-medium">
                    Enter Product Information
                  </h2>
                  <p className="px-3 text-sm font-regular text-compgray">
                    Add Your Product Details
                  </p>
                </div>
                <div className="px-3 py-2">
                  <label>Product SKU</label>
                  <input
                    className="border-2 border-lightsilver placeholder-slate-400 w-full px-2 py-1"
                    type="text"
                    value={productSku}
                    onChange={(e) => setProductSku(e.target.value)}
                    required
                  />
                  {errors.product_sku && (
                    <p className="text-red-500 text-sm">{errors.product_sku}</p>
                  )}
                </div>
                <div className="px-3 py-2">
                  <label>Product Name</label>
                  <input
                    className="border-2 border-lightsilver placeholder-lightsilver w-full px-2 py-1"
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    required
                  />
                  {errors.product_name && (
                    <p className="text-red-500 text-sm">{errors.product_name}</p>
                  )}
                </div>
                <div className="px-3 py-2">
                  <label>Product Description</label>
                  <textarea
                    className="border-2 border-lightsilver placeholder-lightsilver w-full px-2 py-1"
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                  />
                </div>
                {errors.general && (
                  <p className="text-red-500 text-sm">{errors.general}</p>
                )}
                <div className="relative py-4">
                  <button
                    type="button"
                    className="absolute right-5 mr-20 px-4 py-1 border border-compblue text-compblue rounded-xl transform hover:scale-105"
                    onClick={() => setPrdBx(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="absolute right-0 text-white bg-compblue rounded-xl px-4 py-1 transform hover:scale-105 hover:shadow-2xl"
                  >
                    Enter
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

export default ProductManagement;