import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import ProductListing from "../components/ProductList";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Myproducts() {
  const { products, setProducts } = useContext(ProductContext);
  const navigate = useNavigate();

  // Delete Handler
  const onDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/products/delete/${id}`);
      const filtered = products.filter((p) => p._id !== id);
      setProducts(filtered);
    } catch (err) {
      console.error("Failed to delete product:", err);
      alert("Error deleting product");
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 py-12 px-4 w-full">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10">
          <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight text-center sm:text-left mb-6 sm:mb-0">
            My Products
          </h1>

          {/* Add Product Button */}
          <button
            onClick={() => navigate("/addproduct")}
            className="inline-flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          >
            + Add New Product
          </button>
        </div>

        {/* Product Listing */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-indigo-100">
          <ProductListing products={products} onDelete={onDelete} />
        </div>
      </div>
    </section>
  );
}

export default Myproducts;
