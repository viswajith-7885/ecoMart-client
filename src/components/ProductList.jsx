import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ProductList = ({ products, onDelete }) => {
  const nav = useNavigate();

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
            <ProductItem
              key={product._id}
              product={product}
              onDelete={onDelete}
              nav={nav}
            />
          ))}
        </ul>
      </div>
    </section>
  );
};

// ✅ Separate component for a single product with image carousel
const ProductItem = ({ product, onDelete, nav }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Support multiple images (fallback to single image)
  const images = product.images?.length ? product.images : [product.image];

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  return (
    <li className="flex flex-col sm:flex-row items-center sm:items-start bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-indigo-100 p-6 sm:p-8 relative overflow-hidden">
      {/* Accent background circle */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-indigo-100 rounded-full opacity-30 pointer-events-none" />

      {/* 🖼️ Image Carousel */}
      <div className="relative w-40 h-40 mb-4 sm:mb-0 sm:mr-8 rounded-xl overflow-hidden ring-2 ring-indigo-200">
        <img
          src={images[currentIndex] || "https://via.placeholder.com/200"}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500"
        />

        {/* Arrows only if multiple images */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute top-1/2 left-2 transform -translate-y-1/2 p-1 bg-white/40 hover:bg-white/70 rounded-full shadow text-gray-700 hover:text-indigo-700 transition"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              onClick={nextImage}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 p-1 bg-white/40 hover:bg-white/70 rounded-full shadow text-gray-700 hover:text-indigo-700 transition"
            >
              <ChevronRight size={18} />
            </button>

            {/* Dots */}
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
              {images.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-2 h-2 rounded-full ${
                    idx === currentIndex
                      ? "bg-indigo-600"
                      : "bg-gray-300 opacity-70"
                  }`}
                ></div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* 📝 Details */}
      <div className="flex-1 text-center sm:text-left">
        <h2 className="text-2xl font-semibold text-gray-800 mb-1">
          {product.name}
        </h2>
        <p className="text-gray-600 mb-3 leading-relaxed">
          {product.description}
        </p>
        <p className="text-indigo-600 font-bold text-xl">₹{product.price}</p>
      </div>

      {/* 🧰 Action Buttons */}
      <div className="flex flex-col sm:flex-col gap-3 sm:ml-6 mt-4 sm:mt-0">
        <button
          onClick={() => nav(`/updatepro/${product._id}`)}
          className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-blue-600 hover:to-green-700 text-white px-5 py-2 rounded-lg font-medium shadow hover:shadow-lg transition-all duration-200"
        >
          Update
        </button>

        {onDelete && (
          <button
            onClick={() => onDelete(product._id)}
            className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white px-5 py-2 rounded-lg font-medium shadow hover:shadow-lg transition-all duration-200"
          >
            Delete
          </button>
        )}
      </div>
    </li>
  );
};

export default ProductList;
