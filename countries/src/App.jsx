// Exercises 2.18.-2.20. 
// See the README.md file for this project.

// src/App.jsx:

// Import React and the useState and useEffect hooks
import React, { useState, useEffect } from 'react';
// useState for state management, and useEffect for side effects (like data fetching).
// Import services
import countryService from './services/countries';
import weatherService from './services/weather';
import Country from './components/Country';
import Weather from './components/Weather';
// Defines the main App functional component and initializes its state variables using useState.
const App = () => {
  // search: hold value of the input field. Initialise with no text ('').
  const [search, setSearch] = useState('');
  // countries: hold returned countries (objects) data in array. Initialise with empty array.
  const [countries, setCountries] = useState([]);
  // allCountries: hold complete list of countries returned by api/all endpoint
  const [allCountries, setAllCountries] = useState([]);
  // Hold weather information. An object populated with the temperature, wind, and icon data
  const [weather, setWeather] = useState(null);

  // Initialisation: This useEffect hook fetches all countries once when the component mounts. 
  useEffect(() => {
    countryService
      .getAll()
      .then(allCountriesData => {
        setAllCountries(allCountriesData);
      })
      .catch(error => {
        console.error('Error fetching all countries:', error);
      });
  }, []); // The empty dependency array ensures this runs only once, at start-up.
    // Filtering: Runs whenever search or allCountries changes. If search is empty, it shows all countries. Otherwise, it filters allCountries based on the search term and updates the countries state with the matches.
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

  // Event handler: Updates the search state every time the user types in the input field.
  // This creates a controlled component, where the input's value is always synchronized with a piece of state.
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };
  // Event Handler: Called when a [show] button is clicked. 
  // It forces the countries state to contain only the clicked country, triggering the single-country detailed view.
  const handleShowClick = (country) => {
    setCountries([country]);
  };

  // useEffect hook depends on the countries state. Will only run when a single country is displayed (countries.length === 1).
  // This hook will execute a side effect: fetching weather data. 
  useEffect(() => {
    // Conditional Fetch ensures the API call only made when a single country is being displayed.
    if (countries.length === 1 && countries[0].capital && countries[0].capital.length > 0) {
      const capital = countries[0].capital[0];
      weatherService
        .getWeather(capital)
        .then(weatherData => {
          setWeather(weatherData);
        })
      .catch(error => {
        console.error('Error fetching weather data:', error);
        setWeather(null); // Clear weather data on error
      });
  } else {
      setWeather(null); // Clear weather data when not viewing a single country.
  } // Dependency array [countries] ensures this hook runs every time the countries state changes.
}, [countries]);
  // Render the search form and a container for the results.
  return (
  <div>
    <form>
      find countries: <input value={search} onChange={handleSearchChange} />
    </form>
    <div>
      {/* Conditional rendering: only show results if the user has typed a search term */}
      {search.length > 0 ? (
        countries.length > 10 ? (
          // Displayed if more than 10 countries match the search
          <p>Too many matches, specify another filter</p>
        ) : countries.length > 1 ? (
          // Displayed if 2 to 10 countries match. Renders <ul> with country.name and [show] button (calling handleShowClick).
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
          <> 
              {/* Detailed View: Render Country and Weather as separate components, employing co-located data fetching */}
              <Country country={countries[0]} />
              <Weather capital={countries[0].capital[0]} weather={weather} />
            </>
        ) : (  // Displayed if the search yields zero matches
          <p>No countries found</p>
        )  // If search.length is 0, render nothing (or null)
      ) : null}
    </div>
  </div>
);
};

export default App;