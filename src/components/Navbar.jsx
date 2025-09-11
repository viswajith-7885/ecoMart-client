import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo / Brand */}
        <Link to="/" className="text-2xl font-bold tracking-wide">
          EcoMart
        </Link>

        {/* Links */}
        <div className="space-x-6">
          <Link to="/" className="hover:text-yellow-300">Home</Link>
          <Link to="/login" className="hover:text-yellow-300">Login</Link>
          <Link to="/register" className="hover:text-yellow-300">Register</Link>
        </div>
      </div>
    </nav>
  );
}
