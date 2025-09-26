import React from "react";
import { useNavigate } from "react-router-dom";

const ProductList = ({ products, onDelete }) => {
    const nav = useNavigate()
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4">
        {/* Title */}
        <h1 className="text-4xl font-extrabold mb-10 text-center text-indigo-800 tracking-tight">
           Our Products
        </h1>

        {/* Empty state */}
        {products.length === 0 && (
          <p className="text-center text-gray-600 text-lg">
            No products available. Come back soon!
          </p>
        )}

        {/* Product List */}
        <ul className="space-y-8">
          {products.map((product) => (
            <li
              key={product._id}
              className="flex flex-col sm:flex-row items-center sm:items-start bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-indigo-100 p-6 sm:p-8 relative overflow-hidden"
            >
              {/* Accent background circle */}
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-indigo-100 rounded-full opacity-30 pointer-events-none" />

              {/* Product Image */}
              <img
                src={product.image || "https://via.placeholder.com/200"}
                alt={product.name}
                className="w-40 h-40 object-cover rounded-xl flex-shrink-0 mb-4 sm:mb-0 sm:mr-8 ring-2 ring-indigo-200"
              />

              {/* Details */}
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-2xl font-semibold text-gray-800 mb-1">
                  {product.name}
                </h2>
                <p className="text-gray-600 mb-3 leading-relaxed">
                  {product.description}
                </p>
                <p className="text-indigo-600 font-bold text-xl">
                  ${product.price}
                </p>
              </div>

              {/* Delete button */}
              {onDelete && (
                <button
                  onClick={() => onDelete(product._id)}
                  className="mt-4 sm:mt-0 sm:ml-6 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white px-5 py-2 rounded-lg font-medium shadow hover:shadow-lg transition-all duration-200"
                >
                  Delete
                </button>
                
              )}

              
                <button
                  onClick={() => nav(`/updatepro/${product._id}`)}
                  className="mt-4 sm:mt-0 sm:ml-6 bg-gradient-to-r from-green-500 to-blue-600 hover:from-blue-600 hover:to-green-700 text-white px-5 py-2 rounded-lg font-medium shadow hover:shadow-lg transition-all duration-200"
                >
                  update
                </button>
                
              
              
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ProductList;
