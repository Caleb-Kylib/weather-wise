import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center text-white overflow-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-[url('/images/clouds.jpg')] bg-cover bg-center bg-no-repeat"
        aria-hidden="true"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-blue-900/60"></div>

      {/* Hero Section */}
      <section className="relative z-10 text-center px-4 pt-24">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
          Your Weather,{" "}
          <span className="text-yellow-400">Simplified</span>
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-white/90">
          Get accurate forecasts for any city worldwide — plan your day with confidence.
        </p>
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-yellow-400 text-blue-900 font-semibold px-8 py-4 rounded-full shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300"
        >
          Get Started →
        </button>
      </section>

      {/* Feature Cards */}
      <div className="relative z-10 grid gap-6 mt-20 w-full max-w-3xl px-6 pb-16">
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

        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl flex items-start gap-4">
    <div className="bg-yellow-500/80 w-10 h-10 rounded-full flex items-center justify-center text-white text-lg">
      ⭐
    </div>
    <div>
      <h3 className="font-semibold text-white text-lg">Save Favorite Cities</h3>
      <p className="text-white/80 text-sm">
        Quickly access your most visited cities and view their weather instantly from your favorites page.
      </p>
    </div>
  </div>
      </div>
    </main>
  );
}
