// Exercises 2.6-2.17.
// src/App.jsx
// Application state and logic resides here

// Import the useState hook. Allows functional components to manage state.
// Updatedto inc. useEfect // import { useState } from 'react'
import { useState, useEffect } from 'react'
// Supersceded by Service component // import axios from 'axios'
// Import Service component.
import personService from './services/persons'
// Import Child components.
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  // Initializes the state variable persons with an array of four contact objects. 
  // setPersons is the function used to update this state. Modified, now initialise with empty array.
  const [persons, setPersons] = useState([
    // Seeding contacts moved to db.json file
    // { name: 'Arto Hellas', number: '040-123456', id: 1 },
    // { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    // { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    // { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  // Initializes newName state to an empty string for the name input field. setNewName is the function used to update this state.
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchString, setSearchString] = useState('')

  const [notification, setNotification] = useState({ message: null, type: null })
  
  // useEffect hook: performs side effects, such as fetching data from a server, after a component renders
  useEffect(() => {
    // 1st argument: function that contains the side effect
    console.log('effect')
    // From personService module ....
    personService
      // Call getAll function. The function sends an HTTP GET request to our server to fetch all the contacts. It returns a Promise
      .getAll()
      // Promise handler. The code inside this block will run only after the getAll request is successful and the server sends a response. The response object contains the data from the server.
      .then(response => {
        // Access the data from the response object.
        console.log('promise fulfilled')
        // Take the array of contact objects from response.data and set it as the new value of the persons state variable. This triggers a re-render of the component with the fetched data.
        setPersons(response.data)
      })
      // 2nd argument, [] (an empty array), is the dependency array. An empty array tells React to run this effect only once after the component's initial render.
  }, [])
  console.log('render', persons.length, 'contacts')

  // Set notification to success message (show message). 
  const showMessage = (message, type = 'success') => {   // Default to success
    setNotification({ message, type })
    setTimeout(() => {
      // Reset notification to 'null', after 5 sec (hide message).
      setNotification({ message: null, type: null })
    }, 5000)
  }

  const addName = (event) => {
    // Stop the browser's default form submission behavior, which would cause a full page reload
    event.preventDefault();
    
    // Use the Array.prototype.find() method to search for a person in the persons state array
    const existingPerson = persons.find(person => person.name === newName) // If a match is found, find() returns that person object; otherwise, it returns undefined
  
    if (existingPerson) {
      if (existingPerson.number === newNumber) {
        // Person exists with the same number
        alert(`${newName}'s number is already ${newNumber}. No changes to be made.`)
        setNewName('')
        setNewNumber('')
      } else {
        // Person exists with a different number
        // Display modal with a message, "OK" and "Cancel" buttons. If "OK" clicked: confirmUpdate is true.
        const confirmUpdate = window.confirm(
          `${newName} is already in the phonebook, update number?`
        )
        // "OK" clicked: 
        if (confirmUpdate) {
          // spread syntax (...), creates a new object by copying all properties from existingPerson and then overwriting the number property with the value from newNumber
          const updatedPerson = { ...existingPerson, number: newNumber }
          // From personService module ...
          personService
            // Call the update function: send HTTP PUT request to the server, passing the person's id and the updatedPerson object
            .update(existingPerson.id, updatedPerson)
            // Promise handler for the update request
            .then(response => {
              // Iterate through each person in persons array executing the => function
              setPersons(persons.map(person => 
                // If a person's id matches the one that was updated, it replaces that object with the new data from the server (response.data). Otherwise, it keeps the original object.
                person.id === existingPerson.id ? response.data : person
              ))
              setNewName('')
              setNewNumber('')
              showMessage(`Updated ${response.data.name}'s number, with ${response.data.number}`, 'success')
            })
            .catch(error => {
              console.error('Error updating person:', error)
                // Error handling for 404 (Not Found)
              if (error.response && error.response.status === 404) {
                showMessage(
                  `${existingPerson.name} has already been removed from the server`, 'failure')
                // Update state to reflect the removal
                setPersons(persons.filter(p => p.id !== existingPerson.id))
              } else {
                showMessage(`Failed to update ${existingPerson.name}'s number`, 'failure')
              }
              setNewName('')
              setNewNumber('')
            })
        }
      }
    } else {
      // Person does not exist. find() method returned undefined.
      // Create new personObject
      const personObject = {
        // Assign attributes.
        name: newName,
        number: newNumber,
      };
      // From personService module ...HERE NOW
      personService
      // Call the create function, sending an HTTP POST request to the server to add a new contact.
        .create(personObject)
        // Promise handler 
        .then(response => {
          // Create a new array by adding the newly created person object (in response data from the server) to the end of the current persons array.
          setPersons(persons.concat(response.data))
          // Reset input fields.
          setNewName('')
          setNewNumber('')
          // Display Notification message (success)
          showMessage(`Added ${response.data.name}`, 'success')
        })
        .catch(error => {
          console.error('Error adding person:', error)
          // Display Notification message (failure)
          showMessage(`Failed to add ${personObject.name}`, 'failure')
        })
    }
  }

  // Function to handle person deletion/removal
  const handleDelete = (id, name) => {
    // Confirm deletion with the user via modal confirm
    if (window.confirm(`Delete ${name} ?`)) {
      personService
        .remove(id)
        .then(() => {
          // Update the state by filtering out the deleted person
          setPersons(persons.filter(person => person.id !== id))
          showMessage(`Deleted ${name}`, 'success')
        })
        .catch(error => {
          console.error(`Error deleting person ${name}:`, error)
          // Case person already deleted from the server.
          alert(`${name} has already been removed from the server`, 'failure')
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  // Define handleNameChange, which updates the newName state as the user types in the name input field.
  const handleNameChange = (event) => {
     console.log(event.target.value)  // See each character typed into the name field, printed out to the console.
      setNewName(event.target.value)
  }
  // Define handleNumberChange, which updates the newNumber state as the user types in the number input field.
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  // Define handleSearchChange, which updates the searchString state as the user types in the filter input field.
  const handleSearchChange = (event) => {
     console.log(event.target.value)
      setSearchString(event.target.value)
  }
  // Create a new array (filteredContacts) by filtering the persons array. The filter keeps only the persons whose names (case-insensitively) include the current searchString.
  const filteredContacts = persons.filter(person =>
    person.name.toLowerCase().includes(searchString.toLowerCase())
  )

  return (
    // Components to be rendered
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} type={notification.type} />
      <div>
        {/* The Filter component is rendered. It receives the searchString state and the handleSearchChange function as props. */}
        {/* So the Filter component is called in and handed the searchString and handleSearchChange */}
        <Filter searchString={searchString} handleSearchChange={handleSearchChange} />
      </div>
      <h2>Add Contact</h2>
      {/* The PersonForm component is rendered. It receives the addName function and the current values and handlers for newName and newNumber as props */}
      <PersonForm 
        addName={addName} 
        newName={newName} 
        handleNameChange={handleNameChange} 
        newNumber={newNumber} 
        handleNumberChange={handleNumberChange} 
      />
      <h2>Contacts</h2>
      {/* The Persons component is rendered. It receives the filtered list of contacts (filteredContacts) as a prop */}
      <Persons filteredContacts={filteredContacts} handleDelete={handleDelete} />
    </div>
  )
}

export default App