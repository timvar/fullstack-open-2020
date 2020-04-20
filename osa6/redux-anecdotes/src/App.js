import React from 'react'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import Filter from './components/Filter'

const App = () => {
  return (
    <>
      <h2>Anecdotes</h2>
      <Filter />
      <Notification />
      <AnecdoteForm />
      <AnecdoteList />
    </>
  )
}

export default App
