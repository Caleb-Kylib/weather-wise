import React, { useEffect, useState } from "react";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [weatherData, setWeatherData] = useState([]);

  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

  // Load saved cities from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(saved);
  }, []);

  // Fetch weather for each saved city
  useEffect(() => {
    if (favorites.length === 0) return;

    const fetchWeather = async () => {
      try {
        const results = await Promise.all(
          favorites.map(async (city) => {
            const res = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
            );
            return res.ok ? res.json() : null;
          })
        );
        setWeatherData(results.filter(Boolean));
      } catch (error) {
        console.error("Error fetching favorite cities:", error);
      }
    };

    fetchWeather();
  }, [favorites, API_KEY]);

  // Remove a city from favorites
  const removeFavorite = (city) => {
    const updated = favorites.filter((c) => c !== city);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-700 text-white px-4 py-10">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-8">⭐ Saved Cities</h1>

        {favorites.length === 0 ? (
          <p className="text-white/80 text-lg">
            You have no saved cities yet. Go to the Dashboard and add some!
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {weatherData.map((cityData) => (
              <div
                key={cityData.id}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-left flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-2xl font-semibold mb-2">
                    {cityData.name}
                  </h2>
                  <p className="text-white/80 capitalize">
                    {cityData.weather[0].description}
                  </p>
                  <p className="text-3xl font-bold mt-2">
                    {Math.round(cityData.main.temp)}°C
                  </p>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <img
                    src={`https://openweathermap.org/img/wn/${cityData.weather[0].icon}@2x.png`}
                    alt={cityData.weather[0].main}
                    className="w-12 h-12"
                  />
                  <button
                    onClick={() => removeFavorite(cityData.name)}
                    className="text-red-400 hover:text-red-500 transition font-semibold"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
