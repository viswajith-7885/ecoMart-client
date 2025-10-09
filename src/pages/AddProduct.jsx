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
    category: "",
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const nav = useNavigate();

  const CLOUD_NAME = "dgn5igfzl"; // ✅ Cloudinary name
  const UPLOAD_PRESET = "Ecomarcket_hub"; // ✅ Upload preset

  // handle text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // handle multiple file selection
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles((prev) => [...prev, ...files]);
  };

  // remove image preview before upload
  const handleRemoveImage = (index) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!user) {
      alert("Please login first");
      nav("/login");
      return;
    }

    try {
      if (imageFiles.length === 0) {
        setMessage("Please select at least one image");
        setLoading(false);
        return;
      }

      // Upload multiple images to Cloudinary
      const uploadedUrls = [];

      for (const file of imageFiles) {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", UPLOAD_PRESET);

        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          data
        );
        uploadedUrls.push(res.data.secure_url);
      }

      // Send product data to backend
      const productRes = await axios.post(
        "https://ecomartcket-hub-server.onrender.com/api/products/create",
        {
          ...formData,
          images: uploadedUrls,
          usermail: user.email,
        }
      );

      console.log(productRes.data);
      setMessage("✅ Product added successfully!");
      setFormData({ name: "", description: "", price: "", category: "" });
      setImageFiles([]);
      nav("/");
    } catch (err) {
      console.error(err);
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
          Upload multiple product images and details below.
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
          {/* Product Name */}
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
              placeholder="Brief product description"
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

          {/* Image Upload */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Upload Product Images
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
            />

            {/* Preview */}
            {imageFiles.length > 0 && (
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {imageFiles.map((file, i) => (
                  <div key={i} className="relative">
                    <img
                      src={URL.createObjectURL(file)}
                      alt="preview"
                      className="w-full h-32 object-cover rounded-xl border"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(i)}
                      className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded-md"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Category */}
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
