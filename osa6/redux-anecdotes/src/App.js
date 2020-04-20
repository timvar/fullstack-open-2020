import React from 'react'
import { useDispatch } from 'react-redux'
import { voteAnecdote } from './reducers/anecdoteReducer'
import Anecdotes from './components/Anecdotes'
import AnecdoteForm from './components/AnecdoteForm'

const App = () => {

  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteAnecdote(id))
  }

  return (
    <>
      <Anecdotes vote={vote} />
      <AnecdoteForm />
    </>
  )
}

export default App
