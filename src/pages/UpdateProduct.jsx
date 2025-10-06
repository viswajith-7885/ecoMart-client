import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Authcontext } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";

export default function UpdateProduct() {
  const { user } = useContext(Authcontext);
  const { products } = useContext(ProductContext);
  const { id } = useParams();
  const nav = useNavigate();

  const product = products.find((p) => p._id === id);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
  });
  const [newImageFile, setNewImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const CLOUD_NAME = "dgn5igfzl";
  const UPLOAD_PRESET = "Ecomarcket_hub";

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        description: product.description || "",
        price: product.price || "",
        image: product.image || "",
        category: product.category || "",
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setNewImageFile(e.target.files[0] || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please login first");
      nav("/login");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      let imageUrl = formData.image;

      if (newImageFile) {
        const data = new FormData();
        data.append("file", newImageFile);
        data.append("upload_preset", UPLOAD_PRESET);

        const uploadRes = await axios.post(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          data
        );
        imageUrl = uploadRes.data.secure_url;
      }

      // ✅ Update product with new or existing image URL
      await axios.put(
        `https://ecomartcket-hub-server.onrender.com/api/products/update/${id}`,
        {
          ...formData,
          image: imageUrl,
          usermail: user.email,
        }
      );

      setMessage("✅ Product updated successfully!");
      nav("/");
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "❌ Error updating product");
    } finally {
      setLoading(false);
    }
  };

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen text-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600">
        Loading product…
      </div>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white-600 via-purple-600 to-pink-500 p-6 w-full">
      <div className="w-full max-w-2xl backdrop-blur-md bg-white/90 dark:bg-gray-900/70 rounded-3xl shadow-2xl p-10 border border-white/30">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 dark:text-gray-100 mb-4">
          ✏️ Edit Your Product
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
          Update details and give your product a fresh new look.
        </p>

        {message && (
          <div
            className={`mb-6 text-center font-medium p-3 rounded-lg ${
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
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-800 p-3 text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-indigo-400 transition"
              required
            />
          </div>
          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-800 p-3 text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-indigo-400 transition"
              required
            />
          </div>
          {/* Price */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Price (₹)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              step="0.01"
              className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-800 p-3 text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-indigo-400 transition"
              required
            />
          </div>
          {/* ✅ Cloudinary Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Product Image
            </label>
            <p className="text-xs text-gray-500 mb-1">
              Current image will remain if you don’t choose a new file.
            </p>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-800 p-3 text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-indigo-400 transition file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
            {formData.image && !newImageFile && (
              <img
                src={formData.image}
                alt="Current"
                className="mt-3 h-32 w-auto rounded-lg shadow"
              />
            )}
          </div>
          
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
          {/* Buttons */}
          <div className="flex items-center justify-between pt-4">
            <button
              type="button"
              onClick={() => nav("/")}
              className="px-6 py-3 rounded-xl text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition font-semibold"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold shadow-md hover:shadow-xl hover:from-indigo-600 hover:to-purple-600 transition-all disabled:opacity-60"
            >
              {loading ? "Updating..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
