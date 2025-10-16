import React from "react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <main className="relative min-h-screen w-full text-white flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
       className="absolute inset-0 bg-[url('/images/clouds.jpg')] bg-cover bg-center bg-no-repeat"
       aria-hidden="true"
      />

      {/* Color Overlay */}
      <div className="absolute inset-0 bg-blue-900/50"></div>

      {/* Navbar */}
      <nav className="absolute top-6 left-0 w-full flex justify-between items-center px-6 md:px-16 z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <span className="text-blue-600 text-lg font-bold">☁</span>
          </div>
          <h1 className="font-bold text-xl md:text-2xl">WeatherWise</h1>
        </div>
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-white text-blue-600 px-4 py-2 rounded-full font-medium hover:bg-opacity-90 transition"
        >
          Get Started
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 text-center px-4 sm:px-6 md:px-0 mt-20 flex flex-col items-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
          Your Weather, <span className="text-yellow-400">Simplified</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 text-white/90">
          Get accurate weather forecasts for any location worldwide. Plan your
          day with confidence.
        </p>
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-lg transition-transform hover:scale-105"
        >
          Launch Dashboard →
        </button>
      </section>

      {/* Feature Cards */}
      <div className="relative z-10 grid gap-6 mt-16 w-full max-w-4xl px-4 sm:px-0">
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl flex items-start gap-4">
          <div className="bg-blue-500/80 w-12 h-12 rounded-full flex items-center justify-center text-white text-lg">
            📍
          </div>
          <div>
            <h3 className="font-semibold text-white text-lg">Location Detection</h3>
            <p className="text-white/80 text-sm sm:text-base">
              Automatically detect your location or search for any city worldwide
            </p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl flex items-start gap-4">
          <div className="bg-pink-500/80 w-12 h-12 rounded-full flex items-center justify-center text-white text-lg">
            📈
          </div>
          <div>
            <h3 className="font-semibold text-white text-lg">5-Day Forecast</h3>
            <p className="text-white/80 text-sm sm:text-base">
              Plan ahead with detailed weather predictions for the next 5 days
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
