import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../context/CartProvider";

export default function ProductView() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);
  const nav = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `https://ecomartcket-hub-server.onrender.com/api/products/${id}`
        );
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handlePrev = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  // Optional autoplay
  useEffect(() => {
    if (!product?.images?.length) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) =>
        prev === product.images.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [product]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl text-indigo-600">
        Loading…
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center mt-20 text-red-600 text-xl font-semibold">
        Product not found.
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4 w-full">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden md:flex md:space-x-10 transition-all duration-300 hover:shadow-indigo-200/70">
        
        {/* 🖼️ Image Carousel */}
        <div className="md:w-1/2 relative group overflow-hidden rounded-3xl">
          {product.images && product.images.length > 0 ? (
            <>
              {/* Fade transition container */}
              <div className="relative w-full h-[500px] overflow-hidden">
                {product.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Slide ${index}`}
                    className={`absolute top-0 left-0 w-full h-full object-cover rounded-3xl transition-all duration-700 ease-in-out ${
                      index === currentImageIndex
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-105"
                    }`}
                  />
                ))}

                {/* Elegant gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-3xl"></div>

                {/* Floating Navigation Arrows */}
                <button
                  onClick={handlePrev}
                  className="absolute top-1/2 left-5 transform -translate-y-1/2 bg-white/80 hover:bg-indigo-600 hover:text-white text-gray-800 p-3 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100"
                >
                  ◀
                </button>
                <button
                  onClick={handleNext}
                  className="absolute top-1/2 right-5 transform -translate-y-1/2 bg-white/80 hover:bg-indigo-600 hover:text-white text-gray-800 p-3 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100"
                >
                  ▶
                </button>

                {/* Carousel Indicator Dots */}
                <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {product.images.map((_, i) => (
                    <span
                      key={i}
                      onClick={() => setCurrentImageIndex(i)}
                      className={`cursor-pointer w-3 h-3 rounded-full transition-all duration-300 ${
                        i === currentImageIndex
                          ? "bg-indigo-600 scale-125"
                          : "bg-white/70 hover:bg-indigo-300"
                      }`}
                    ></span>
                  ))}
                </div>
              </div>

              {/* 🧩 Thumbnails Row */}
              <div className="flex justify-center gap-3 mt-5 px-4">
                {product.images.map((img, index) => (
                  <div
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-20 h-20 overflow-hidden rounded-xl cursor-pointer border-2 shadow-sm transition-all duration-300 ${
                      index === currentImageIndex
                        ? "border-indigo-600 scale-105 shadow-indigo-200"
                        : "border-transparent opacity-70 hover:opacity-100 hover:scale-105"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumb ${index}`}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <img
              src="https://via.placeholder.com/600x500"
              alt={product.name}
              className="w-full h-[500px] object-cover rounded-3xl shadow-lg"
            />
          )}

          <span className="absolute top-4 left-4 bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
            Featured
          </span>
        </div>

        {/* 🛍️ Product Info */}
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
              {product.name}
            </h1>
            <p className="text-gray-600 leading-relaxed mb-6 text-lg">
              {product.description}
            </p>
            <p className="text-3xl font-bold text-indigo-700 mb-8">
              ₹{product.price}
            </p>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={() => {
                addToCart(product, id);
                nav("/cart");
              }}
              className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
            >
              Add to Cart
            </button>
            <button
              onClick={() => nav(`/pay/${product._id}`)}
              className="flex-1 border-2 border-indigo-600 text-indigo-600 py-3 rounded-xl font-semibold hover:bg-indigo-50 transition-colors duration-200"
            >
              Buy Now
            </button>
          </div>

          <div className="mt-10 border-t pt-6 text-sm text-gray-500 space-y-2">
            <p>✔️ Free shipping on orders above ₹999</p>
            <p>✔️ 7-day easy return policy</p>
          </div>
        </div>
      </div>
    </section>
  );
}
