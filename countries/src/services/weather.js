// src/services/weather.js
import axios from 'axios';
// getWeather function takes a capital name as argument.
// It constructs the URL for the OpenWeatherMap API, incorperating the capital and the apiKey (from the .env file).
const getWeather = (capital) => {
  const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${apiKey}`;
  
  return axios.get(weatherUrl)
    .then(response => response.data);
};

export default { getWeather };