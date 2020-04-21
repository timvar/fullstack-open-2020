import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  return (await axios.get(baseUrl)).data
}

const createAnecdote = async (content) => {
  const anecdote = {
    content,
    votes: 0
  }
  return (await axios.post(baseUrl, anecdote)).data
}

export default { getAll, createAnecdote }
