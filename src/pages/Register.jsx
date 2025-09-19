import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function Register() {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const nav = useNavigate()

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/api/auth/register", formData);
      alert("Registration successful!");
      nav('/login')
      console.log(res.data);
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4 w-full">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl p-8 md:p-10 border border-blue-100">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-blue-700">Create Account</h1>
          <p className="mt-2 text-gray-500">Join EcoMarketHub and start exploring</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="username"
              placeholder="Your name"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-md transition duration-200"
          >
            Register
          </button>
        </form>

        {/* Footer link */}
        <div className="text-center mt-6 text-sm text-gray-600">
          <p>
            Already have an account?{" "}
            <a
              href="/login"
              className="text-blue-700 hover:underline"
            >
              Log in
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
