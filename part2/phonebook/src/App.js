import React, { useState, useEffect } from 'react';
import Filter from './components/Filter'
import Add from './components/Add'
import Contacts from './components/Contacts'
import phonebookService from './services/phonebook'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  console.log("notification", message)
  const className = "notification " + message.type
  return (
    <div className={className}>
      {message.message}
    </div>
  )
}

const App = () => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('')
  const [msg, setMsg] = useState(null)

  useEffect(() => {
    console.log("effect")
    phonebookService
      .getAll()
      .then(initialData => {
        setPersons(initialData)
      })
  }, [])

  const replace = (id) => {
    const name = persons.find(person => person.id === id).name
    const template = name + " is already in the phonebook, do you want "
      + "to replace their old number with a new number?"

    if (window.confirm(template)) {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      phonebookService
        .update(id, newPerson)
        .then(returnData => {
          setPersons(persons.filter(person => person.id !== id).concat(returnData))
          const notification = "Replaced " + newPerson.name
          const newMsg = { type: "success", message: notification }
          setMsg(newMsg)
        })
        .catch(error => {
          const notification = "Error " + newPerson.name + " already removed from server"
          const newMsg = { type: "error", message: notification }
          setMsg(newMsg)
        })
    }
  }

  const handleAdd = (event) => {
    event.preventDefault()
    const personInList = persons.find(person => person.name === newName.trim())
    if (personInList) {
      replace(personInList.id)
      return
    }

    const newPerson = {
      name: newName.trim(),
      number: newNumber.trim()
    }

    phonebookService
      .create(newPerson)
      .then(returnData => {
        setPersons(persons.concat(returnData))
        setNewName('')
        setNewNumber('')

        const notification = "Added " + newPerson.name
        const newMsg = { type: "success", message: notification }
        setMsg(newMsg)
      })
      .catch(error => {
        console.log(error.response.data)
        const newMsg = { type: "error", message: error.response.data.error }
        setMsg(newMsg)
      })


  }

  const handleDelete = id => {
    console.log(persons.find(person => person.id === id).name)
    const template = "Delete " + persons.find(person => person.id === id).name + "?"

    if (window.confirm(template)) {
      phonebookService
        .remove(id)
        .then(response => {
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  const handleNewName = event => setNewName(event.target.value)

  const handleNewNumber = event => setNewNumber(event.target.value)

  const handleFilter = event => setFilter(event.target.value)

  let personsToShow = persons.filter(person => person.name.includes(filter))

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={msg} />

      <Filter handleFilter={handleFilter} filter={filter} />

      <h2>add new contact</h2>

      <Add handleAdd={handleAdd}
        newName={newName} handleNewName={handleNewName}
        newNumber={newNumber} handleNewNumber={handleNewNumber} />

      <h2>contacts</h2>

      <Contacts persons={personsToShow} handleDelete={handleDelete} />
    </div >
  )
}

export default App;
