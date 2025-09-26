// src/main.jsx
// Entry point for the React application

// Import necessary library to render React components to the DOM
import ReactDOM from 'react-dom/client'
// Import CSS styling file
import './index.css'
//  Import the main App component. The root of the application's component tree.
import App from './App'
//  Initialize React app. Creating a "root" to manage the rendering process inside the HTML element with the ID root
ReactDOM.createRoot(document.getElementById('root'))
  // Renders the App component within the previously created 'root'. This triggers the execution and rendering of the App component.
  .render(<App />
)
