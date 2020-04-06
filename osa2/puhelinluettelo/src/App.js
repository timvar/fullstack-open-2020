import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const Filter = ({ filter, handleChange }) => {
  return (
    <div>
      filter shown with <input value={filter} onChange={handleChange} />
    </div>
  )
}

const PersonForm = ({ onSubmit, name, number, handleNameChange, handleNumberChange }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={name} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={number} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({ persons, personFilter, handleRemovePerson }) => {
  
  return persons
  .filter(person => person.name.toLowerCase().includes(personFilter.toLowerCase()))
  .map((person) => <Person key={person.name} person={person} handleRemovePerson={handleRemovePerson} />)
  
}

const Person = ({ person, handleRemovePerson }) => <p> {person.name} {person.number} <button onClick={() => handleRemovePerson(person.id)} >delete</button> </p>

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  }

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.find(person => person.name === newName) === undefined) {
      const newPerson = {
        name: newName,
        number: newNumber
      };

      personService
        .create(newPerson)
        .then(response => {
          setPersons(persons.concat(response.data));
        })
        .catch(error => alert('Failed to add person to database.'));
      setNewName('');
      setNewNumber('');
    } else {
      alert(`${newName} is already added to phonebook`);
    }
  }

  const removePerson = (id) => {
    if (window.confirm(`Delete ${persons.filter(person => person.id === id).map(person => person.name).join()} ?`))
    personService
      .remove(id)
      .then(() => setPersons(persons.filter(person => person.id !== id)))
      .catch(error => alert('Failed to remove person from database.'));
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={newFilter} handleChange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm
        name={newName}
        number={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        onSubmit={addPerson} />
      <h3>Numbers</h3>
      <Persons 
        persons={persons} 
        personFilter={newFilter} 
        handleRemovePerson={removePerson} />
    </div>
  )
}

export default App
