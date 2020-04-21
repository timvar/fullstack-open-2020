export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const createAnecdote = (anecdote) => {
  return {
    type: 'NEW_ANECDOTE',
    data: {
      content: anecdote.content,
      id: anecdote.id,
      votes: anecdote.votes
    }
  }
}

export const initAnecdotes = anecdotes => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes
  }
}

const reducer = (state = [], action) => {

  switch (action.type) {
    case 'VOTE':
      const votedAnecdote = state.find(a => a.id === action.data.id)
      votedAnecdote.votes += 1
      return state.map(a => a.id === action.data.id ? votedAnecdote : a)
    case 'NEW_ANECDOTE':
      console.log('new anecdote')
      return state.concat(action.data)
    case 'INIT_ANECDOTES':
      return action.data

    default: return state
  }

}

export default reducer
