import React from "react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 text-white px-4">
      {/* Navbar */}
      <nav className="absolute top-6 left-0 w-full flex justify-between items-center px-8">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
            <span className="text-blue-600 text-lg font-bold">☁</span>
          </div>
          <h1 className="font-bold text-xl">WeatherNow</h1>
        </div>
        <button 
        onClick={() => navigate("/dashboard")}
        className="bg-white text-blue-600 px-4 py-2 rounded-full font-medium hover:bg-opacity-90">
          Get Started
        </button>
      </nav>

      {/* Hero Section */}
      <section className="text-center mt-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Your Weather, <span className="text-yellow-400">Simplified</span>
        </h1>
        <p className="text-lg max-w-xl mx-auto mb-8 text-white/90">
          Get accurate weather forecasts for any location worldwide. Plan your
          day with confidence.
        </p>
        <button 
        onClick={() => navigate("/dashboard")}
        className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-full shadow-md hover:scale-105 transition-transform">
          Launch Dashboard →
        </button>
      </section>

      {/* Feature Cards */}
      <div className="grid gap-6 mt-16 w-full max-w-3xl">
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl flex items-start gap-4">
          <div className="bg-blue-500/80 w-10 h-10 rounded-full flex items-center justify-center text-white text-lg">
            📍
          </div>
          <div>
            <h3 className="font-semibold text-white text-lg">Location Detection</h3>
            <p className="text-white/80 text-sm">
              Automatically detect your location or search for any city worldwide
            </p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl flex items-start gap-4">
          <div className="bg-pink-500/80 w-10 h-10 rounded-full flex items-center justify-center text-white text-lg">
            📈
          </div>
          <div>
            <h3 className="font-semibold text-white text-lg">5-Day Forecast</h3>
            <p className="text-white/80 text-sm">
              Plan ahead with detailed weather predictions for the next 5 days
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
