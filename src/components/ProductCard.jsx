import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProductCard({ product }) {
  const nav = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  // ✅ Support multiple images
  const images = product.images?.length ? product.images : [product.image];

  // ✅ Carousel Navigation
  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  return (
    <div className="group relative bg-gradient-to-b from-white to-gray-50 rounded-2xl shadow-md hover:shadow-2xl overflow-hidden transform hover:-translate-y-1 hover:scale-105 transition-all duration-300">
      {/* ✅ Carousel Section */}
      <div className="relative w-full h-56 overflow-hidden">
        <img
          src={images[currentIndex] || "https://via.placeholder.com/400x300"}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* ✅ Carousel Arrows */}
        {images.length > 1 && (
          <>
            {/* Left Button */}
            <button
              onClick={prevImage}
              className="absolute top-1/2 left-3 transform -translate-y-1/2 p-2 rounded-full bg-white/30 backdrop-blur-md border border-white/40 shadow-md hover:scale-110 hover:bg-gradient-to-r from-violet-600 to-purple-600 hover:text-white transition-all duration-300"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Right Button */}
            <button
              onClick={nextImage}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 p-2 rounded-full bg-white/30 backdrop-blur-md border border-white/40 shadow-md hover:scale-110 hover:bg-gradient-to-r from-violet-600 to-purple-600 hover:text-white transition-all duration-300"
            >
              <ChevronRight size={20} />
            </button>

            {/* ✅ Dots Indicator */}
            <div className="absolute bottom-3 w-full flex justify-center gap-1">
              {images.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? "bg-violet-600 scale-110 shadow-md"
                      : "bg-gray-300"
                  }`}
                ></div>
              ))}
            </div>
          </>
        )}

        <span className="absolute top-3 right-3 bg-violet-600 text-white text-xs px-2 py-1 rounded-full shadow">
          New
        </span>
      </div>

      {/* ✅ Product Content */}
      <div className="p-5 flex flex-col justify-between h-48">
        <div>
          <h3 className="text-xl font-bold text-gray-800 group-hover:text-violet-700">
            {product.name}
          </h3>
          <p className="text-gray-600 mt-2 text-sm line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between mt-4">
          <span className="text-2xl font-extrabold text-violet-700">
            ₹{product.price}
          </span>

          <div className="flex gap-2">
            <button
              onClick={() => nav(`/pay/${product._id}`)}
              className="px-4 py-2 rounded-lg bg-violet-600 text-white font-medium hover:bg-violet-700 hover:shadow-lg transition"
            >
              Buy
            </button>
            <button
              onClick={() => nav(`/productview/${product._id}`)}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 hover:border-gray-400 transition"
            >
              View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
