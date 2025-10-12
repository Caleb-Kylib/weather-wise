import React, { useState } from "react";

export default function Dashboard() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Function to aggregate 5-day forecast data
  const aggregateForecastData = (forecastList) => {
    const dailyData = {};
    
    forecastList.forEach(item => {
      const date = new Date(item.dt * 1000).toDateString();
      const dayKey = date;
      
      if (!dailyData[dayKey]) {
        dailyData[dayKey] = {
          date: date,
          temps: [],
          weathers: [],
          descriptions: []
        };
      }
      
      dailyData[dayKey].temps.push(item.main.temp);
      dailyData[dayKey].weathers.push(item.weather[0]);
      dailyData[dayKey].descriptions.push(item.weather[0].description);
    });
    
    // Convert to array and calculate min/max temps
    return Object.values(dailyData).map(day => {
      // Use the weather condition from the middle of the day (around noon)
      const midDayWeather = day.weathers[Math.floor(day.weathers.length / 2)] || day.weathers[0];
      
      return {
        date: day.date,
        minTemp: Math.min(...day.temps),
        maxTemp: Math.max(...day.temps),
        icon: midDayWeather.icon,
        description: midDayWeather.description
      };
    });
  };

  const fetchWeather = async (e) => {
    e.preventDefault();
    setError("");
    setWeather(null);
    setForecast(null);
    setLoading(true);

    if (!city.trim()) {
      setError("Please enter a city name.");
      setLoading(false);
      return;
    }

    try {
      const apiKey = "250a2978e0e1afaef8dffb8f29c9a6c0";
      
      // Fetch current weather and 5-day forecast in parallel
      const [currentResponse, forecastResponse] = await Promise.all([
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`),
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)
      ]);

      if (!currentResponse.ok || !forecastResponse.ok) {
        throw new Error("City not found.");
      }

      const [currentData, forecastData] = await Promise.all([
        currentResponse.json(),
        forecastResponse.json()
      ]);

      // Set current weather
      setWeather({
        name: currentData.name,
        temp: currentData.main.temp,
        humidity: currentData.main.humidity,
        wind: currentData.wind.speed,
        icon: currentData.weather[0].icon,
        description: currentData.weather[0].description,
      });

      // Process and set 5-day forecast
      const aggregatedForecast = aggregateForecastData(forecastData.list);
      setForecast(aggregatedForecast);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
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
          disabled={loading}
          className="bg-yellow-400 hover:bg-yellow-500 disabled:bg-yellow-300 disabled:cursor-not-allowed text-blue-900 px-6 py-3 rounded-lg font-semibold transition transform hover:scale-105 disabled:transform-none"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {/* Error Message */}
      {error && (
        <p className="bg-red-500/80 px-5 py-3 rounded-lg mb-6 max-w-md text-center shadow-lg">
          {error}
        </p>
      )}

      {/* Current Weather Card */}
      {weather && (
        <div className="bg-white/10 backdrop-blur-lg p-10 rounded-3xl text-center shadow-2xl w-full max-w-md border border-white/10 mb-8">
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

      {/* 5-Day Forecast */}
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
                  index === 0 ? 'ring-2 ring-yellow-400 shadow-yellow-400/20' : ''
                }`}
              >
                <h4 className="font-semibold text-lg mb-2 text-white/90">
                  {index === 0 ? 'Today' : new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                </h4>
                <p className="text-sm text-white/70 mb-3">
                  {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </p>
                <img
                  src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                  alt="weather icon"
                  className="mx-auto w-16 h-16 drop-shadow-lg mb-3"
                />
                <p className="capitalize text-sm text-white/80 mb-3">
                  {day.description}
                </p>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-blue-300 font-semibold">
                    {Math.round(day.minTemp)}°C
                  </span>
                  <span className="text-red-300 font-semibold">
                    {Math.round(day.maxTemp)}°C
                  </span>
                </div>
                <div className="flex justify-between text-xs text-white/60 mt-1">
                  <span>Min</span>
                  <span>Max</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
