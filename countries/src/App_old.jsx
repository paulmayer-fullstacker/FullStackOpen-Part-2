// src/App.jsx:

// Import React and the useState and useEffect hooks
import React, { useState, useEffect } from 'react';
// Import axios for API-fetching
import axios from 'axios';

const App = () => {
  // search: hold value of the input field
  const [search, setSearch] = useState('');
  // countries: hold returned countries (objects) data in array.
  const [countries, setCountries] = useState([]);
  // allCountries: hold complete list of countries returned by api/all endpoint
  const [allCountries, setAllCountries] = useState([]);
  // Hold weather information. An object populated with the temperature, wind, and icon data
  const [weather, setWeather] = useState(null);

  // This useEffect hook fetches all countries once when the component mounts.
  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setAllCountries(response.data);
      })
      .catch(error => {
        console.error('Error fetching all countries:', error);
      });
  }, []); // The empty dependency array ensures this runs only once.

    useEffect(() => {
    if (search === '') {
      setCountries(allCountries);
    } else {
      const filteredCountries = allCountries.filter(country =>
        country.name.common.toLowerCase().includes(search.toLowerCase())
      );
      setCountries(filteredCountries);
    }
  }, [search, allCountries]);

  // Event handler: updates the search state every time the user types in the input field.
  // This creates a controlled component, where the input's value is always synchronized with a piece of state.
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleShowClick = (country) => {
    setCountries([country]);
  };

  // useEffect hook depends on the countries state. Will only run when a single country is displayed (countries.length === 1).
  // This hook will execute a side effect: fetching weather data. 
  useEffect(() => {
    // Conditional Fetch ensures the API call only made when a single country is being displayed.
  if (countries.length === 1) {
    const capital = countries[0].capital[0];
    // Access environment variable
    const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY; // Use your actual env variable name
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${apiKey}`;

    axios
      .get(weatherUrl)
      .then(response => {
        setWeather(response.data);
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
        setWeather(null); // Clear weather data on error
      });
  } else {
    setWeather(null); // Clear weather data when not viewing a single country.
  } // Dependency array [countries] ensures this hook runs every time the countries state changes.
}, [countries]);

  return (
  <div>
    <form>
      find countries: <input value={search} onChange={handleSearchChange} />
    </form>
    <div>
      {search.length > 0 ? (
        // Only render something if a search term exists
        countries.length > 10 ? (
          <p>Too many matches, specify another filter</p>
        ) : countries.length > 1 ? (
          <ul>
            {countries.map(country => (
              // The <li> contains the country name and a [show] button
              <li key={country.name.common}>
                {country.name.common}
                <button onClick={() => handleShowClick(country)}>show</button>
              </li>
              // // The entire <li> is now clickable. No `button` required.
              // <li 
              //   key={country.name.common}
              //   onClick={() => handleShowClick(country)}
              //   style={{ cursor: 'pointer' }}
              // >
              //   {country.name.common}
              // </li>
            ))}
          </ul>
        ) : countries.length === 1 ? (
          <div>
            <h2>{countries[0].name.common}</h2>
            <p>capital {countries[0].capital[0]}</p>
            <p>area {countries[0].area}</p>
            <h3>languages:</h3>
            <ul>
              {Object.values(countries[0].languages).map(language => (
                <li key={language}>{language}</li>
              ))}
            </ul>
            <img src={countries[0].flags.png} alt={`Flag of ${countries[0].name.common}`} width="150" />

             {weather && (
              <>
                <h3>Weather in {countries[0].capital[0]}</h3>
                <p>temperature {weather.main.temp} Celsius</p>
                <img
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt={weather.weather[0].description}
                  width="100"
                />
                <p>wind {weather.wind.speed} m/s</p>
              </>
            )}

          </div>
        ) : (
          <p>No countries found</p>
        )
      ) : null}
    </div>
  </div>
);
};

export default App;