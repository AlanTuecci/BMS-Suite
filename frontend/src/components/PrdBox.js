import React, { useState } from 'react';
import { onAddProduct } from '../api/auth';

const PrdBox = ({ closePrdBx, refreshProducts }) => {
  const [productSku, setProductSku] = useState('');
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        product_sku: productSku,
        product_name: productName,
        product_description: productDescription,
      };

      await onAddProduct(productData);
      setSuccessMessage('Product added successfully!');
      setErrors({});
      refreshProducts();
      closePrdBx();
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const errorObj = {};
        error.response.data.errors.forEach((err) => {
          errorObj[err.path] = err.msg;
        });
        setErrors(errorObj);
      } else {
        console.error('Error adding product:', error);
        setErrors({ general: 'Failed to add product' });
      }
    }
  };

  return (
    <div className="fixed inset-0 z-20 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="rounded-lg p-8 bg-white w-[25em]">
        <form onSubmit={handleSubmit}>
          <div className="leading-tight">
            <h2 className="px-3 text-xl font-medium">Enter Product Information</h2>
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
          {errors.general && <p className="text-red-500 text-sm">{errors.general}</p>}
          <div className="relative py-4">
            <button
              type="button"
              className="absolute right-5 mr-20 px-4 py-1 border border-compblue text-compblue rounded-xl transform hover:scale-105"
              onClick={closePrdBx}
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
  );
};

export default PrdBox;
