import { useContext, useState } from "react";
import axios from "axios";
import { Authcontext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const { user } = useContext(Authcontext);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",        // ✅ new field
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const nav = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    if (!user) {
      alert("Please login first");
      nav("/login");
    }
    try {
      const res = await axios.post("http://localhost:4000/api/products/create", {
        ...formData,
        usermail: user.email,
      });
      console.log(res.data);
      nav("/");
      setMessage("✅ Product added successfully!");
      setFormData({ name: "", description: "", price: "", image: "", category: "" });
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Error adding product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-indigo-100 py-12 px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-indigo-100 p-8 md:p-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 text-center mb-6">
          Add a New Product
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Fill in the details below to showcase your product to the world.
        </p>

        {message && (
          <div
            className={`mb-6 text-center font-medium p-3 rounded-lg transition ${
              message.includes("successfully")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter product name"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Brief description of the product"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Price (₹)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              step="0.01"
              className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter price"
              required
            />
          </div>

          {/* Image */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Image URL
            </label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Paste image link"
              required
            />
          </div>

          {/* ✅ Category */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="">Select a category</option>
              <option value="fashion">Fashion</option>
              <option value="home">Home</option>
              <option value="sports">Sports</option>
              <option value="electronics">Electronics</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-lg font-semibold py-3 rounded-xl shadow-md hover:shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-60"
          >
            {loading ? "Uploading..." : "Add Product"}
          </button>
        </form>
      </div>
    </section>
  );
}
