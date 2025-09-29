import { useContext, useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Cartcontext } from "../context/cartcontext.js";



export default function ProductView() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const {addToCart}=useContext(Cartcontext);
  const nav = useNavigate()



  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://ecomartcket-hub-server.onrender.com/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  //Add to cart

  

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
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden md:flex md:space-x-10">
        {/* Product Image */}
        <div className="md:w-1/2 relative">
          <img
            src={product.image || "https://via.placeholder.com/600x500"}
            alt={product.name}
            className="w-full h-full object-cover md:rounded-l-3xl hover:scale-105 transition-transform duration-500"
          />
          <span className="absolute top-4 left-4 bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
            Featured
          </span>
        </div>

        {/* Product Info */}
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              {product.name}
            </h1>
            <p className="text-gray-600 leading-relaxed mb-6 text-lg">
              {product.description}
            </p>
            <p className="text-3xl font-bold text-indigo-700 mb-8">
              ${product.price}
            </p>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={()=>{addToCart(product,id) ,nav('/cart')}}
              className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
            >
              Add to Cart
            </button>
            <button onClick={()=>nav('/pay')} className="flex-1 border-2 border-indigo-600 text-indigo-600 py-3 rounded-xl font-semibold hover:bg-indigo-50 transition-colors duration-200">
              Buy Now
            </button>
          </div>

          {/* Extra details section (optional) */}
          <div className="mt-10 border-t pt-6 text-sm text-gray-500 space-y-2">
            <p>✔️ Free shipping on orders above ₹999</p>
            <p>✔️ 7-day easy return policy</p>
          </div>
        </div>
      </div>
    </section>
  );
}
