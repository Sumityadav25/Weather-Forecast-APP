import React from 'react';

function WeatherDisplay({ weather }) {
  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

  return (
    <div className="weather-card">
      <h2>{weather.name}, {weather.sys.country}</h2>
      <img src={iconUrl} alt="weather icon" />
      <p><strong>{weather.weather[0].description.toUpperCase()}</strong></p>
      <p>🌡 Temp: {weather.main.temp}°C</p>
      <p>💧 Humidity: {weather.main.humidity}%</p>
      <p>💨 Wind Speed: {weather.wind.speed} m/s</p>
    </div>
  );
}

export default WeatherDisplay;
