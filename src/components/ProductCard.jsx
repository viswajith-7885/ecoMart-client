import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const nav = useNavigate();
  return (
    <div className="group relative bg-gradient-to-b from-white to-gray-50 rounded-2xl shadow-md hover:shadow-2xl overflow-hidden transform hover:-translate-y-1 hover:scale-105 transition-all duration-300">
      {/* Product image */}
      <div className="relative w-full h-56 overflow-hidden">
        <img
          src={product.image || "https://via.placeholder.com/400x300"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <span className="absolute top-3 right-3 bg-violet-600 text-white text-xs px-2 py-1 rounded-full shadow">
          New
        </span>
      </div>

      {/* Content */}
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
            ${product.price}
          </span>

          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-lg bg-violet-600 text-white font-medium hover:bg-violet-700 hover:shadow-lg transition" onClick={()=>nav('/chat')}>
              Buy
            </button>
            <button
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 hover:border-gray-400 transition"
              onClick={() => nav(`/productview/${product._id}`)}
            >
              View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
