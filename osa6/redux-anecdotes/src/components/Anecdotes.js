import React from 'react'
import { useSelector } from 'react-redux'

const Anecdotes = ({vote}) => {
  const anecdotes = useSelector(state => state)

  return (
    <>
      <h2>Anecdotes</h2>
      {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default Anecdotes

