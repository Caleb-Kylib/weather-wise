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
      const apiKey = "250a2978e0e1afaef8dffb8f29c9a6c0"; // 🔑 Replace with your API key
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

      if (!response.ok) {
        throw new Error("City not found.");
      }

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
    <main className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white p-6">
      {/* Header */}
      <header className="w-full flex justify-between items-center max-w-4xl mb-8">
        <h1 className="text-2xl font-bold">🌤 Weather Dashboard</h1>
        <a
          href="/"
          className="bg-white text-blue-600 px-4 py-2 rounded-full font-medium hover:bg-opacity-90 transition"
        >
          ← Back Home
        </a>
      </header>

      {/* Search Bar */}
      <form
        onSubmit={fetchWeather}
        className="w-full max-w-md flex gap-3 mb-8"
      >
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 px-5 py-3 rounded-lg font-semibold transition"
        >
          Search
        </button>
      </form>

      {/* Error Message */}
      {error && (
        <p className="bg-red-500/80 px-4 py-2 rounded-lg mb-6">{error}</p>
      )}

      {/* Weather Card */}
      {weather && (
        <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl text-center shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-semibold mb-2">{weather.name}</h2>
          <img
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt="weather icon"
            className="mx-auto w-20 h-20"
          />
          <p className="capitalize text-lg mb-4 text-white/90">
            {weather.description}
          </p>

          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="bg-white/20 rounded-xl p-4">
              <h3 className="font-semibold text-yellow-300">Temp</h3>
              <p className="text-xl font-bold">{weather.temp}°C</p>
            </div>
            <div className="bg-white/20 rounded-xl p-4">
              <h3 className="font-semibold text-yellow-300">Humidity</h3>
              <p className="text-xl font-bold">{weather.humidity}%</p>
            </div>
            <div className="bg-white/20 rounded-xl p-4">
              <h3 className="font-semibold text-yellow-300">Wind</h3>
              <p className="text-xl font-bold">{weather.wind} km/h</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
