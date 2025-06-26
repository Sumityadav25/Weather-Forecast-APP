import './App.css';
import React, { useState, useEffect } from 'react';
import WeatherForm from './components/WeatherForm';
import WeatherDisplay from './components/WeatherDisplay';
import ForecastChart from './components/ForecastChart';

const API_KEY = "30e62642dfc89f800fe3acc542c991db";  // 🛑 actual API key

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Get weather by city name
  const getWeatherByCity = async (cityName) => {
    try {
      setLoading(true);
      setError("");

      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
      );
      const weather = await weatherRes.json();

      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${API_KEY}`
      );
      const forecast = await forecastRes.json();

      if (weather.cod !== 200 || forecast.cod !== "200") {
        setError("City not found. Try again.");
        setWeatherData(null);
        setForecastData([]);
        return;
      }

      setWeatherData(weather);
      // Use every 8th item (3-hour interval * 8 = 24 hours)
      setForecastData(forecast.list.filter((_, index) => index % 8 === 0));
    } catch (err) {
      setError("Something went wrong while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  // Auto-detect user location on first load
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
          );
          const data = await res.json();
          if (data.name) {
            getWeatherByCity(data.name);
          }
        } catch (e) {
          console.log("Geo fetch failed.");
        }
      },
      () => console.log("User denied location access."),
      { timeout: 10000 }
    );
  }, []);

  return (
    <div style={{ maxWidth: '700px', margin: 'auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>🌤 Weather Forecast App</h1>
      <WeatherForm onSearch={getWeatherByCity} />
      {loading && <p>Loading data...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {weatherData && <WeatherDisplay weather={weatherData} />}
      {forecastData.length > 0 && <ForecastChart forecast={forecastData} />}
    </div>
  );
}

export default App;
