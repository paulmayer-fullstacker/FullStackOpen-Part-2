// src/services/countries.js
import axios from 'axios';
// Defines the base URL for the Rest Countries API.
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api';
// getAll function uses axios to make a GET request to retrieve all country data.
const getAll = () => {
  return axios.get(`${baseUrl}/all`)
    .then(response => response.data);
};

export default { getAll };