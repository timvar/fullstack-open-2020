import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { addMessage, resetMessage } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
  const filterText = useSelector(state => state.filter)

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote.id))
    dispatch(addMessage(`you voted '${anecdote.content}'`))
    setTimeout(() => dispatch(resetMessage()), 5000)
  }

  return (
    <>
      {anecdotes.filter(a => a.content.toLowerCase().includes(filterText.toLowerCase()))
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        )}
    </>
  )
}

export default AnecdoteList

