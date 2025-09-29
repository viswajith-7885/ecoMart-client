import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import { ProductContext } from "../context/ProductContext";

export default function Home() {
  const { products, setProducts } = useContext(ProductContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Fetch all products once
  useEffect(() => {
    axios
      .get("https://ecomartcket-hub-server.onrender.com/api/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load products");
        setLoading(false);
        console.error(err);
      });
  }, [setProducts]);

  // Filter logic
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" ||
      p.category?.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  if (loading) return <p className="text-center mt-10">Loading products...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <div className="bg-gray-50 min-h-screen w-full flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
            Welcome to <span className="text-yellow-300">EcoMarketHub</span>
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-gray-100 max-w-2xl mx-auto">
            Your one-stop shop for sustainable and trendy products.
          </p>
        </div>
        <svg
          className="absolute bottom-0 w-full h-16 text-gray-50"
          viewBox="0 0 1440 320"
          fill="currentColor"
        >
          <path
            d="M0,64L60,90.7C120,117,240,171,360,176C480,181,600,139,720,138.7C840,139,960,181,1080,197.3C1200,213,1320,203,1380,197.3L1440,192V320H0Z"
            fill="currentColor"
          />
        </svg>
      </section>

      {/* Main Content */}
      <main className="flex-1 relative z-10 -mt-6">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
            Featured Products
          </h2>

          {/* 🔍 Search + Filter Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
            />

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full sm:w-1/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              <option value="all">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
              <option value="home">Home</option>
              <option value="sports">Sports</option>
              {/* Add more categories as needed */}
            </select>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <p className="text-center text-gray-500">
              No products match your search.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 text-center mt-auto">
        <p className="text-sm">
          © {new Date().getFullYear()} EcoMart • Sustainable shopping for all
        </p>
      </footer>
    </div>
  );
}
