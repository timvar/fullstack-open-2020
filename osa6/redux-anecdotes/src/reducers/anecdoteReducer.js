const getId = () => (100000 * Math.random()).toFixed(0)

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const createAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    data: {
      content,
      id: getId(),
      votes: 0
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
