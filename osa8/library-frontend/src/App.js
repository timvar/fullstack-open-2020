import React, { useState } from 'react'
import { useApolloClient, useSubscription } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'
import { BOOK_ADDED } from './queries'

const Notify = ({ errorMessage }) => errorMessage ? <div>{errorMessage}</div> : null

const App = () => {
  const [page, setPage] = useState('')
  const [token, setToken] = useState(null)
  const [favGenre, setFavGenre] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({subscriptionData}) => {
      console.log('sub data', subscriptionData)
      window.alert(`A new book ${subscriptionData.data.bookAdded.title} was added.`)
    }
  })

  const logout = () => {
    setPage('')
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setFavGenre(null)
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
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('login')}>login</button>
        </>
      ) :
        (
          <>
            <div>
              <button onClick={() => setPage('authors')}>authors</button>
              <button onClick={() => setPage('books')}>books</button>
              <button onClick={() => setPage('add')}>add book</button>
              <button onClick={() => setPage('recommend')}>recommend</button>
              <button onClick={logout}>logout</button>
            </div >
          </>
        )
      }
      <Authors show={page === 'authors'} token={token} />
      <Books show={page === 'books'} />
      <NewBook show={page === 'add'} />
      <Recommend show={page === 'recommend'} favGenre={favGenre} />
      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setError={notify}
        setPage={setPage}
        setFavGenre={setFavGenre} />
    </>
  )
}

export default App
