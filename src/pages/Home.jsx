import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import { ProductContext } from "../context/ProductContext";
import { useContext } from "react";


export default function Home() {
  const {products,setProducts}=useContext(ProductContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  const fetchProducts = () =>
  axios.get("http://localhost:4000/api/products")
    .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
    .catch(err => {
        setError("Failed to load products");
        setLoading(false);
        console.error(err);
      });

useEffect(() => { fetchProducts(); }, []);

  //Deletehandler
    // const handleDelete = async (id) => {
    //  try {
    //   await axios.delete(`http://localhost:4000/api/products/delete/${id}`);
    //   fetchProducts();

  //   } catch (err) {
  //     console.error("Failed to delete product:", err);
  //     alert("Error deleting product");
  //   }
  //     };

  if (loading) return <p className="text-center mt-10">Loading products...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <div className="bg-gray-50 min-h-screen w-full flex flex-col">
      <Navbar />

  
         <section className="relative bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
            Welcome to <span className="text-yellow-300">EcoMarcketHub  </span>
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-gray-100 max-w-2xl mx-auto">
            Your one-stop shop for sustainable and trendy products.
          </p>
        </div>
        {/* Decorative wave at bottom */}
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
 

        <main className="flex-1 relative z-10 -mt-6">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
            Featured Products
          </h2>

          {products.length === 0 ? (
            <p className="text-center text-gray-500">
              No products available right now.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>
     
       <footer className="bg-gray-900 text-gray-300 py-8 text-center mt-auto">
        <p className="text-sm">
          © {new Date().getFullYear()} EcoMart • Sustainable shopping for all
        </p>
      </footer>
    </div>
  );
}
