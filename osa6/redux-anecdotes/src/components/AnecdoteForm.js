import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { addMessage, resetMessage } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {

  const dispatch = useDispatch()

  const addAnecdote = async event => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    try {
      const newAnecdote = await anecdoteService.createAnecdote(content)
      dispatch(createAnecdote(newAnecdote))
      dispatch(addMessage(`You added new anecdote '${newAnecdote.content}'`))
      setTimeout(() => dispatch(resetMessage()), 5000)
    } catch (error) {
      console.log('Create anecdote failed.')
    }
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdote'/></div>
        <button type='submit'>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm
