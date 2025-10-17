import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Favorites", path: "/favorites" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/10 backdrop-blur-lg border-b border-white/20">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center text-white">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="bg-yellow-400 w-8 h-8 rounded-full flex items-center justify-center">
            <span className="text-blue-900 text-xl">☁</span>
          </div>
          <h1 className="font-bold text-xl tracking-wide">Weather Wise</h1>
        </div>

        {/* Nav Links */}
        <ul className="hidden md:flex gap-8 text-sm font-medium">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`transition ${
                  location.pathname === item.path
                    ? "text-yellow-400 font-semibold"
                    : "hover:text-yellow-300"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button (optional for later) */}
        <button className="md:hidden bg-yellow-400 text-blue-900 px-3 py-1 rounded-lg font-semibold">
          ☰
        </button>
      </div>
    </nav>
  );
}
