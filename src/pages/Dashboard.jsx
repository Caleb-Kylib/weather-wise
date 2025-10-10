import React, { useState } from "react";

function Dashboard() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async (e) => {
    e.preventDefault();
    setError("");
    setWeather(null);

    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-400 to-sky-200 flex flex-col items-center px-6 py-10 text-white">
      <h1 className="text-4xl font-bold mb-8">Weather Dashboard</h1>

      {/* Search Bar */}
      <form
        onSubmit={fetchWeather}
        className="flex flex-col md:flex-row gap-4 mb-10 w-full max-w-xl"
      >
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name..."
          className="w-full px-4 py-3 rounded-xl text-gray-800 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition"
        >
          Search
        </button>
      </form>

      {/* Error Message */}
      {error && (
        <p className="text-red-200 bg-red-500/30 px-4 py-2 rounded-lg mb-6">
          {error}
        </p>
      )}

      {/* Weather Info */}
      {weather && (
        <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl text-center shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-4">
            {weather.name}, {weather.sys.country}
          </h2>

          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="Weather Icon"
            className="mx-auto w-24 h-24"
          />

          <p className="text-5xl font-bold mb-2">
            {Math.round(weather.main.temp)}°C
          </p>
          <p className="capitalize text-lg mb-6">
            {weather.weather[0].description}
          </p>

          <div className="flex justify-around text-sm md:text-base">
            <p>💧 Humidity: {weather.main.humidity}%</p>
            <p>🌬️ Wind: {Math.round(weather.wind.speed * 3.6)} km/h</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
