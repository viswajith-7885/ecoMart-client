import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // install lucide-react if you don’t have it

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-violet-600 to-blue-700 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-wide hover:text-yellow-300 transition-colors duration-200"
        >
          EcoMarket<span className="text-yellow-300">Hub</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8 font-medium">
          <NavItem to="/">Home</NavItem>
          <NavItem to="/login">Login</NavItem>
          <NavItem to="/register">Register</NavItem>
          <NavItem to="/myproducts">My Products</NavItem>
        </div>

        {/* Mobile toggle button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden focus:outline-none"
          aria-label="Toggle Menu"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-indigo-700 text-white space-y-2 px-4 pb-4 animate-slideDown">
          <NavItem to="/" onClick={() => setOpen(false)}>
            Home
          </NavItem>
          <NavItem to="/login" onClick={() => setOpen(false)}>
            Login
          </NavItem>
          <NavItem to="/register" onClick={() => setOpen(false)}>
            Register
          </NavItem>
          <NavItem to="/myproducts" onClick={() => setOpen(false)}>
            My Products
          </NavItem>
        </div>
      )}
    </nav>
  );
}

// Reusable link component
function NavItem({ to, children, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="relative hover:text-yellow-300 transition-colors duration-200
                 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0
                 after:bg-yellow-300 after:transition-all after:duration-300
                 hover:after:w-full"
    >
      {children}
    </Link>
  );
}
