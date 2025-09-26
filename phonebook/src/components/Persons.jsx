// src/components/Persons.jsx

// Define the component, destructuring the filteredContacts prop
const Persons = ({ filteredContacts, handleDelete }) => {
  return (
    <ul>
      {/* Iterate over the filteredContacts array (filteredContacts is the result of the filtering logic in App.jsx) */}
      {filteredContacts.map((person) => (
        // For each person in the array, create a list item (<li>). The key prop is used to uniquely identify each element in the list.
        <li key={person.id}>
          {/* Display the name and number for each person. */}
          {person.name} {person.number}
          <button onClick={() => handleDelete(person.id, person.name)}>
            delete
          </button>
        </li>
      ))}
    </ul>
  )
}

export default Persons