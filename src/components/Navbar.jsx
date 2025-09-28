import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Menu,
  X,
  Home,
  LogIn,
  LogOut,
  UserCircle2,
  Package,
  MessageCircle,
  ShoppingCart
} from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // ✅ Check token in localStorage
  const isLoggedIn = Boolean(localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

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

          {/* ✅ Show My Products only if logged in */}
          {isLoggedIn && (
            <NavIcon to="/myproducts" icon={<Package size={22} />} label="My Products" />
          )}

          <NavIcon to="/chat" icon={<MessageCircle size={22} />} label="Chats" />
          <NavIcon to="/cart" icon={<ShoppingCart size={22} />} label="Cart" />

          {/* ✅ Conditional Login/Logout with dynamic icon */}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="relative flex items-center space-x-1 hover:text-red-400 transition-colors duration-200
                         after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0
                         after:bg-red-400 after:transition-all after:duration-300
                         hover:after:w-full"
              title="Logout"
            >
              <UserCircle2 size={24} />
            </button>
          ) : (
            <NavIcon to="/login" icon={<LogIn size={22} />} label="Login" />
          )}
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
          <NavIcon to="/" icon={<Home size={20} />} label="Home" onClick={() => setOpen(false)} />

          {/* ✅ Show My Products only if logged in (mobile) */}
          {isLoggedIn && (
            <NavIcon
              to="/myproducts"
              icon={<Package size={20} />}
              label="My Products"
              onClick={() => setOpen(false)}
            />
          )}

          <NavIcon to="/chat" icon={<MessageCircle size={20} />} label="Chats" onClick={() => setOpen(false)} />
          <NavIcon to="/cart" icon={<ShoppingCart size={20} />} label="Cart" onClick={() => setOpen(false)} />

          {/* ✅ Mobile: conditional Login/Logout */}
          {isLoggedIn ? (
            <button
              onClick={() => {
                handleLogout();
                setOpen(false);
              }}
              className="relative flex items-center space-x-1 hover:text-red-400 transition-colors duration-200
                         after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0
                         after:bg-red-400 after:transition-all after:duration-300
                         hover:after:w-full"
              title="Logout"
            >
              <UserCircle2 size={22} />
            </button>
          ) : (
            <NavIcon
              to="/login"
              icon={<LogIn size={20} />}
              label="Login"
              onClick={() => setOpen(false)}
            />
          )}
        </div>
      )}
    </nav>
  );
}

// Reusable icon link (unchanged)
function NavIcon({ to, icon, label, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="relative flex items-center space-x-1 hover:text-yellow-300 transition-colors duration-200
                 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0
                 after:bg-yellow-300 after:transition-all after:duration-300
                 hover:after:w-full"
      title={label}
    >
      {icon}
    </Link>
  );
}
