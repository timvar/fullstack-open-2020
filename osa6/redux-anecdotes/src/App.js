import React from 'react'
import { useDispatch } from 'react-redux'
import { voteAnecdote,createAnecdote } from './reducers/anecdoteReducer'
import Anecdotes from './components/Anecdotes'
import CreateAnecdote from './components/CreateAnecdote'

const App = () => {

  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteAnecdote(id))
  }

  const addAnecdote = (event) => {
    event.preventDefault()
    console.log('addAnecdote:', event.target.anecdote.value)
    dispatch(createAnecdote(event.target.anecdote.value))
    event.target.anecdote.value = ''
  }

  return (
    <>
      <Anecdotes vote={vote} />
      <CreateAnecdote addAnecdote={addAnecdote}/>
    </>
  )
}

export default App
