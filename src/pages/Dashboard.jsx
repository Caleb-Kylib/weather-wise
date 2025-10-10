import React, { useState } from "react";

export default function Dashboard() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async (e) => {
    e.preventDefault();
    setError("");
    setWeather(null);

    if (!city.trim()) {
      setError("Please enter a city name.");
      return;
    }

    try {
      const apiKey = "250a2978e0e1afaef8dffb8f29c9a6c0";
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

      if (!response.ok) throw new Error("City not found.");

      const data = await response.json();
      setWeather({
        name: data.name,
        temp: data.main.temp,
        humidity: data.main.humidity,
        wind: data.wind.speed,
        icon: data.weather[0].icon,
        description: data.weather[0].description,
      });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-start bg-gradient-to-b from-[#0B1120] to-[#1E293B] text-white p-6 overflow-x-hidden">
      {/* Header */}
      <header className="w-full flex justify-between items-center max-w-5xl mb-10">
        <h1 className="text-3xl font-bold tracking-wide">🌤 Weather Dashboard</h1>
        <a
          href="/"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full font-medium transition-all shadow-md hover:shadow-blue-500/30"
        >
          ← Back Home
        </a>
      </header>

      {/* Search Bar */}
      <form onSubmit={fetchWeather} className="w-full max-w-lg flex gap-3 mb-10">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="flex-1 px-5 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 px-6 py-3 rounded-lg font-semibold transition transform hover:scale-105"
        >
          Search
        </button>
      </form>

      {/* Error Message */}
      {error && (
        <p className="bg-red-500/80 px-5 py-3 rounded-lg mb-6 max-w-md text-center shadow-lg">
          {error}
        </p>
      )}

      {/* Weather Card */}
      {weather && (
        <div className="bg-white/10 backdrop-blur-lg p-10 rounded-3xl text-center shadow-2xl w-full max-w-md border border-white/10">
          <h2 className="text-3xl font-semibold mb-3">{weather.name}</h2>
          <img
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt="weather icon"
            className="mx-auto w-24 h-24 drop-shadow-lg"
          />
          <p className="capitalize text-lg mb-5 text-white/90 tracking-wide">
            {weather.description}
          </p>

          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="bg-white/10 rounded-xl p-5 shadow-inner">
              <h3 className="font-semibold text-yellow-300">Temp</h3>
              <p className="text-xl font-bold">{weather.temp}°C</p>
            </div>
            <div className="bg-white/10 rounded-xl p-5 shadow-inner">
              <h3 className="font-semibold text-yellow-300">Humidity</h3>
              <p className="text-xl font-bold">{weather.humidity}%</p>
            </div>
            <div className="bg-white/10 rounded-xl p-5 shadow-inner">
              <h3 className="font-semibold text-yellow-300">Wind</h3>
              <p className="text-xl font-bold">{weather.wind} km/h</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
