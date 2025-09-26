// src/services/persons.js
import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

// Function to fetch all persons from the server. Returning the raw Promise.
const getAll = () => {
  return axios.get(baseUrl)
}

// Function to create a new person. Returns the raw Promise.
const create = newObject => {
  return axios.post(baseUrl, newObject)
}

// Function to handle updating a person's details
const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

// Function to remove person (by Id) from Phonebook.
const remove = id => {
  return axios.delete(`${baseUrl}/${id}`)
}

// Export the functions for use elsewhere
export default { 
  getAll, 
  create,
  update,
  remove
}