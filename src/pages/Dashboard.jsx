import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import toast from "react-hot-toast";

export default function Dashboard() {
  const navigate = useNavigate();
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [unit, setUnit] = useState("metric");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Use environment variable for API key
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

  // --- Aggregate 5-day forecast ---
  const aggregateForecastData = (forecastList) => {
    const dailyData = {};
    forecastList.forEach((item) => {
      const date = new Date(item.dt * 1000).toDateString();
      if (!dailyData[date]) dailyData[date] = { temps: [], weathers: [] };
      dailyData[date].temps.push(item.main.temp);
      dailyData[date].weathers.push(item.weather[0]);
    });

    return Object.entries(dailyData).map(([date, day]) => {
      const midDayWeather =
        day.weathers[Math.floor(day.weathers.length / 2)] || day.weathers[0];
      return {
        date,
        minTemp: Math.min(...day.temps),
        maxTemp: Math.max(...day.temps),
        icon: midDayWeather.icon,
        description: midDayWeather.description,
      };
    });
  };

  // --- Get next 12-hour forecast ---
  const getHourlyForecast = (forecastList) => {
    const next12Hours = forecastList.slice(0, 8);
    setHourlyForecast(
      next12Hours.map((item) => ({
        time: new Date(item.dt * 1000).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        temp: item.main.temp,
        icon: item.weather[0].icon,
        description: item.weather[0].description,
      }))
    );
  };

  // --- Fetch weather by city ---
  const fetchWeather = async (e) => {
    e.preventDefault();
    if (!city.trim()) {
      toast.error("Please enter a city name.");
      return;
    }

    setLoading(true);
    setError("");
    setWeather(null);
    setForecast(null);
    setHourlyForecast([]);

    try {
      const [currentResponse, forecastResponse] = await Promise.all([
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`
        ),
        fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${unit}`
        ),
      ]);

      if (!currentResponse.ok || !forecastResponse.ok)
        throw new Error("City not found.");

      const [currentData, forecastData] = await Promise.all([
        currentResponse.json(),
        forecastResponse.json(),
      ]);

      setWeather({
        name: currentData.name,
        temp: currentData.main.temp,
        humidity: currentData.main.humidity,
        wind: currentData.wind.speed,
        icon: currentData.weather[0].icon,
        description: currentData.weather[0].description,
      });

      setForecast(aggregateForecastData(forecastData.list));
      getHourlyForecast(forecastData.list);

      toast.success(`Weather for ${currentData.name} loaded successfully!`);
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Refetch when unit changes
  useEffect(() => {
    if (city) fetchWeather({ preventDefault: () => {} });
  }, [unit]);

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-start bg-gradient-to-b from-[#0B1120] to-[#1E293B] text-white p-6 overflow-x-hidden">
      
      {/* ✅ NAVBAR */}
      <nav className="w-full max-w-6xl flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <span className="text-2xl">☁️</span>
          <h1 className="font-bold text-xl">WeatherNow</h1>
        </div>
        <div className="flex gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `font-medium hover:text-yellow-400 ${
                isActive ? "text-yellow-400" : "text-white"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `font-medium hover:text-yellow-400 ${
                isActive ? "text-yellow-400" : "text-white"
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              `font-medium hover:text-yellow-400 ${
                isActive ? "text-yellow-400" : "text-white"
              }`
            }
          >
            Favorites
          </NavLink>
        </div>
      </nav>

      {/* Search Bar */}
      <form onSubmit={fetchWeather} className="w-full max-w-lg flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="flex-1 px-5 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-yellow-400 hover:bg-yellow-500 disabled:bg-yellow-300 text-blue-900 px-6 py-3 rounded-lg font-semibold transition"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {/* Favorites Button */}
      <button
        onClick={() => navigate("/favorites")}
        className="bg-white/10 border border-white/20 px-6 py-3 rounded-full font-medium mb-8 hover:bg-white/20 transition"
      >
        ❤️ View Saved Cities
      </button>

      {/* Error Message */}
      {error && (
        <p className="bg-red-500/80 px-5 py-3 rounded-lg mb-6 max-w-md text-center shadow-lg">
          {error}
        </p>
      )}

      {/* --- Current Weather --- */}
      {weather && (
        <div className="bg-white/10 backdrop-blur-lg p-10 rounded-3xl text-center shadow-xl w-full max-w-md mb-8 border border-white/20 transition hover:scale-[1.02]">
          <h2 className="text-3xl font-bold mb-3">{weather.name}</h2>
          <div className="flex justify-center mb-2">
            <img
              src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
              alt="weather icon"
              className="w-20 h-20"
            />
          </div>
          <p className="capitalize text-lg mb-6">{weather.description}</p>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-2xl">🌡️</span>
              <h3 className="font-semibold">Temp</h3>
              <p className="text-xl font-bold">
                {weather.temp}°{unit === "metric" ? "C" : "F"}
              </p>
            </div>
            <div>
              <span className="text-2xl">💧</span>
              <h3 className="font-semibold">Humidity</h3>
              <p className="text-xl font-bold">{weather.humidity}%</p>
            </div>
            <div>
              <span className="text-2xl">💨</span>
              <h3 className="font-semibold">Wind</h3>
              <p className="text-xl font-bold">{weather.wind} km/h</p>
            </div>
          </div>
        </div>
      )}

      {/* --- Hourly Forecast --- */}
      {hourlyForecast.length > 0 && (
        <div className="w-full max-w-6xl mt-4 mb-8">
          <h3 className="text-2xl font-bold text-white/90 mb-4">
            Hourly Forecast
          </h3>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {hourlyForecast.map((hour, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 text-center min-w-[100px]"
              >
                <p className="text-sm text-white/70">{hour.time}</p>
                <img
                  src={`https://openweathermap.org/img/wn/${hour.icon}@2x.png`}
                  alt={hour.description}
                  className="w-12 h-12 mx-auto"
                />
                <p className="text-white/90 font-semibold">
                  {Math.round(hour.temp)}°
                </p>
                <p className="capitalize text-xs text-white/60">
                  {hour.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- 5-Day Forecast --- */}
      {forecast && forecast.length > 0 && (
        <div className="w-full max-w-6xl">
          <h3 className="text-2xl font-bold text-center mb-6 text-white/90">
            5-Day Forecast
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {forecast.map((day, index) => (
              <div
                key={index}
                className={`bg-white/10 backdrop-blur-lg p-6 rounded-2xl text-center shadow-xl border border-white/10 hover:bg-white/15 transition-all duration-300 ${
                  index === 0
                    ? "ring-2 ring-yellow-400 shadow-yellow-400/20"
                    : ""
                }`}
              >
                <h4 className="font-semibold text-lg mb-2 text-white/90">
                  {index === 0
                    ? "Today"
                    : new Date(day.date).toLocaleDateString("en-US", {
                        weekday: "short",
                      })}
                </h4>
                <p className="text-sm text-white/70 mb-3">
                  {new Date(day.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <img
                  src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                  alt="weather icon"
                  className="mx-auto w-16 h-16 mb-3"
                />
                <p className="capitalize text-sm text-white/80 mb-3">
                  {day.description}
                </p>
                <div className="flex justify-between text-sm">
                  <span className="text-blue-300 font-semibold">
                    {Math.round(day.minTemp)}°
                  </span>
                  <span className="text-red-300 font-semibold">
                    {Math.round(day.maxTemp)}°
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
