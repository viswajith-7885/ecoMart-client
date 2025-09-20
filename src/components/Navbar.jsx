import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Home, LogIn, Package, MessageCircle } from "lucide-react";
// make sure lucide-react is installed:  npm install lucide-react

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

        {/* Desktop Icons */}
        <div className="hidden md:flex space-x-8 font-medium items-center">
          <NavIcon to="/" icon={<Home size={22} />} label="Home" />
          <NavIcon
            to="/myproducts"
            icon={<Package size={22} />}
            label="My Products"
          />
          <NavIcon
            to="/chat"
            icon={<MessageCircle size={22} />}
            label="Chats"
          />
          <NavIcon to="/login" icon={<LogIn size={22} />} label="Login" />
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

      {/* Mobile menu with icons */}
      {open && (
        <div className="md:hidden bg-indigo-700 text-white space-y-2 px-4 pb-4 animate-slideDown">
          <NavIcon
            to="/"
            icon={<Home size={20} />}
            label="Home"
            onClick={() => setOpen(false)}
          />
          <NavIcon
            to="/login"
            icon={<LogIn size={20} />}
            label="Login"
            onClick={() => setOpen(false)}
          />

          <NavIcon
            to="/myproducts"
            icon={<Package size={20} />}
            label="My Products"
            onClick={() => setOpen(false)}
          />
          <NavIcon
            to="/chat"
            icon={<MessageCircle size={20} />}
            label="Chats"
            onClick={() => setOpen(false)}
          />
        </div>
      )}
    </nav>
  );
}

// Reusable icon link
function NavIcon({ to, icon, label, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="relative flex items-center space-x-1 hover:text-yellow-300 transition-colors duration-200
                 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0
                 after:bg-yellow-300 after:transition-all after:duration-300
                 hover:after:w-full"
      title={label} // tooltip on hover
    >
      {icon}
    </Link>
  );
}
