import React from "react";
import { Link } from "react-router-dom";

export default function Favorites() {
  // We'll store favorites in localStorage and load them here
  const savedCities = JSON.parse(localStorage.getItem("favorites")) || [];

  return (
    <main
      className="min-h-screen bg-cover bg-center relative text-white"
      style={{
        backgroundImage: `url("/images/clouds.jpg")`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      {/* Navbar */}
      <nav className="relative z-10 flex justify-between items-center px-8 py-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <span className="text-blue-600 text-xl font-bold">☁</span>
          </div>
          <h1 className="font-bold text-xl">Weather Wise</h1>
        </div>
        <div className="flex gap-6 text-sm md:text-base">
          <Link to="/" className="hover:text-yellow-300">Home</Link>
          <Link to="/dashboard" className="hover:text-yellow-300">Dashboard</Link>
          <Link to="/favorites" className="text-yellow-300 font-semibold">Favorites</Link>
        </div>
      </nav>

      {/* Saved Cities Section */}
      <section className="relative z-10 flex flex-col items-center justify-center mt-10 px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">Your Saved Cities 🌤️</h2>

        {savedCities.length === 0 ? (
          <p className="text-white/80 text-lg">No favorite cities yet. Go to the dashboard and save one!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
            {savedCities.map((city, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center shadow-lg hover:scale-105 transition-transform"
              >
                <h3 className="text-2xl font-semibold mb-2">{city.name}</h3>
                <p className="text-white/80">{city.weather}</p>
                <p className="text-yellow-300 text-lg mt-2">{city.temp}°C</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
