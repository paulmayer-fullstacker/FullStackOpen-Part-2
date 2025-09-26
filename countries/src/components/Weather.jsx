// src/components/Weather.jsx
import React from 'react';
// A presentational component that receives the capital name and the weather data object as props
const Weather = ({ capital, weather }) => {
  //  if NO weather data is available:
  if (!weather) {
    return null; // Don't render anything return null to halt process
  }
  // else: Display capitol name. Display temperature, weather icon, and wind speed, using properties from the OpenWeatherMap response object.
  return (
    <>
      <h3>Weather in {capital}</h3>
      <p>temperature {weather.main.temp} Celsius</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather[0].description}
        width="100"
      />
      <p>wind {weather.wind.speed} m/s</p>
    </>
  );
};

export default Weather;