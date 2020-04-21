import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux'

import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import Filter from './components/Filter'
import anecdoteService from './services/anecdotes'
import {initAnecdotes} from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    anecdoteService
    .getAll().then(anecdotes => dispatch(initAnecdotes(anecdotes)))
  }, [dispatch])
  
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
