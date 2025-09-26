// src/components/Country.jsx
import React from 'react';
// A presentational component that receives a single country object as a prop. 
// It renders detailed information (name, capital, area, languages) and the country's flag image.
const Country = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>
      <h3>languages:</h3>
      <ul>
        {/* Object.values(country.languages): Used to map and display the language names from the data structure. */}
        {Object.values(country.languages).map(language => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="150" />
    </div>
  );
};

export default Country;