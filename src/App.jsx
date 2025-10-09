import React from "react";
import "./index.css";
import clouds from "./assets/clouds.jpg"; // Make sure this path is correct

function App() {
  return (
    <div
      className="min-h-screen w-screen bg-cover bg-center bg-no-repeat text-white relative overflow-hidden"
      style={{ backgroundImage: `url(${clouds})` }}
    >
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-blue-900/40 backdrop-blur-sm"></div>

      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full flex justify-between items-center px-8 md:px-16 py-6 z-20">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center">
            <span className="text-blue-600 text-lg font-bold">☁</span>
          </div>
          <h1 className="font-bold text-xl md:text-2xl">Weather Wise</h1>
        </div>
        <button className="bg-white text-blue-600 px-5 py-2 rounded-full font-medium hover:bg-opacity-90 transition">
          Get Started
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center min-h-screen px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight drop-shadow-lg">
          Your Weather,{" "}
          <span className="text-yellow-300">Simplified</span>
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 text-white/90">
          Get accurate weather forecasts for any location worldwide. Plan your
          day with confidence.
        </p>
        <button className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-full shadow-lg hover:scale-105 transition-transform">
          Launch Dashboard →
        </button>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-20 w-full max-w-5xl px-6">
          {/* Card 1 */}
          <div className="bg-white/15 backdrop-blur-md p-8 rounded-2xl flex items-start gap-4 hover:bg-white/25 transition">
            <div className="bg-blue-500/80 w-12 h-12 rounded-full flex items-center justify-center text-white text-xl">
              📍
            </div>
            <div>
              <h3 className="font-semibold text-white text-xl">
                Location Detection
              </h3>
              <p className="text-white/80 text-sm md:text-base">
                Automatically detect your location or search for any city
                worldwide.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white/15 backdrop-blur-md p-8 rounded-2xl flex items-start gap-4 hover:bg-white/25 transition">
            <div className="bg-pink-500/80 w-12 h-12 rounded-full flex items-center justify-center text-white text-xl">
              📈
            </div>
            <div>
              <h3 className="font-semibold text-white text-xl">
                5-Day Forecast
              </h3>
              <p className="text-white/80 text-sm md:text-base">
                Plan ahead with detailed weather predictions for the next 5 days.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>

  );
}
export default App;
