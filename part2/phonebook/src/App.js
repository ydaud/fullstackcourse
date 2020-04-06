import React, { useState } from 'react';
import './App.css';
import Filter from './components/Filter'
import Add from './components/Add'
import Contacts from './components/Contacts'


const App = () => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [filter, setFilter] = useState('')

  const handleAdd = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    const newPerson = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
  }

  const handleNewName = event => setNewName(event.target.value)

  const handleNewNumber = event => setNewNumber(event.target.value)

  const handleFilter = event => setFilter(event.target.value)

  let personsToShow = persons.filter(person => person.name.includes(filter))

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter handleFilter={handleFilter} filter={filter} />

      <h2>add new contact</h2>

      <Add handleAdd={handleAdd}
        newName={newName} handleNewName={handleNewName}
        newNumber={newNumber} handleNewNumber={handleNewNumber} />

      <h2>contacts</h2>

      <Contacts persons={personsToShow} />
    </div >
  )
}

export default App;
