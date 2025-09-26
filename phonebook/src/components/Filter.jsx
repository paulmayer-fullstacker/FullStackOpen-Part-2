// src/components/Filter.jsx

// Define the component, destructuring the props searchString and handleSearchChange from the parent (App)
const Filter = ({ searchString, handleSearchChange }) => {
  return (
    <div>
      {/* <input value={searchString} ... />: Binds the input's displayed value to the searchString prop.
      onChange={handleSearchChange}: Binds the onChange event to the handleSearchChange prop */}
      filter shown with <input value={searchString} onChange={handleSearchChange} />
    </div>
  )
}

export default Filter