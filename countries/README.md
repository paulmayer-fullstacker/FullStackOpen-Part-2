# Countries:

## Creat Vite Project:
npm create vite@latest countries -- --template react

cd countries

npm install

npm install axios

npm run dev

## API Key

The Open Weather Map API requires a registration key (API Key), as seen in the structure of the API URL. 

OpenWeatherMap API URL:
https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

The API key must not be saved to source control or hardcode into the source code. So, an environmental variable must be used to store the key value. During development, the API key value was place in an environmental variable named VITE_OPENWEATHERMAP_API_KEY, in the .env file. With this in place the app service could be started as normal (i.e., npm run dev). 

Should the user choose to enter a key value from the command line (as illustrated below), this value will override the value assigned in the .env file.

Start from PowerShell cmd:
set "VITE_OPENWEATHERMAP_API_KEY=open-weather-map-api-key-value" && npm run dev // For Windows cmd.exe

That said, I have not been able to successfully overwrite the VITE_OPENWEATHERMAP_API_KEY value in this way. Thus, I only use the .env file route.

For security, the .env file is not pushed to the repo (due to the .gitignore file). Copy the .example.env file, and create a new .env file. Edit the file such that: VITE_OPENWEATHERMAP_API_KEY=your-api-key-value-without-quotation-marks.


## Modulatisation

Components Countries and Weather are completely independent, employed in co-located data fetching. the co-located data fetching strategy would mean that the <Country> component would handle fetching its own country data, and the <Weather> component would handle fetching its own weather data. This is in contrast to a pattern where a single parent component fetches all the data and passes it down.

## The Solution (Overview)

The application operates in four main stages: Initialization, Search/Filter, Detail View, and Weather Fetching.

- Initialization (Mounting): When the app loads, the first useEffect hook runs once to fetch the complete list of all countries
 from the Rest Countries API. The full list is stored in the allCountries state.

- Search and Filtering: The user types into the input field, triggering the handleSearchChange function, which immediately updates the search state. The second useEffect hook, which depends on search and allCountries, runs whenever the search term changes. It filters the allCountries list to find matches based on the country's common name and updates the countries state with the results.

- Conditional Rendering: The app's UI dynamically changes based on the number of countries in the countries state:
  - $> 10 matches: Displays "Too many matches..."
  - 2 ≤ matches ≤ 10: Displays a list of country names, each with a show button.
  - 1 match: Displays the detailed Country component and starts the weather fetching process.
  - 0 matches: Displays "No countries found."

- Detail View and Weather Fetching: If the user clicks a show button, the handleShowClick function runs, setting the countries state to contain only the selected country (making its length 1). Setting countries to length 1 triggers the third useEffect hook. This hook fetches the weather data for the country's capital using the OpenWeatherMap API and stores the result in the weather state. The detailed Country and Weather components then render the information from their respective state/props.




