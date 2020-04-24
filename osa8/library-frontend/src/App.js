
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { useApolloClient } from '@apollo/client'

const Notify = ({ errorMessage }) => {
  return (
    errorMessage ? (<div>
      {errorMessage}
    </div>
    )
      :
      null
  )
}

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
  }

  return (
    <>
      <Notify errorMessage={errorMessage} />
      {(!token) ? (
        <>
          <h2>Login</h2>
          <LoginForm
            setToken={setToken}
            setError={notify} />
        </>
      ) :
        (
          <>
            <div>
              <button onClick={logout}>logout</button>
              <button onClick={() => setPage('authors')}>authors</button>
              <button onClick={() => setPage('books')}>books</button>
              <button onClick={() => setPage('add')}>add book</button>
            </div>
            <Authors show={page === 'authors'} />
            <Books show={page === 'books'} />
            <NewBook show={page === 'add'} />
          </>
        )
      }
    </>
  )
}

export default App
