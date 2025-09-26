// src/components/PersonForm.jsx

// Define the component, destructuring the props from the App component.
const PersonForm = ({ addName, newName, handleNameChange, newNumber, handleNumberChange }) => {
  return (
    //  Bind the onSubmit event to the addName function (from App.jsx). When the "add" button is clicked, this function executes.
    <form onSubmit={addName}>
      <div>
        {/* Bind the name input field's value to the newName prop and its onChange event to the handleNameChange prop. */}
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        {/*  Bind the number input field's value to the newNumber prop and its onChange event to the handleNumberChange prop. */}
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm