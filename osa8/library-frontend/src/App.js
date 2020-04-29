import React, { useState, useEffect } from 'react'
import { useApolloClient, useSubscription } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'
import { BOOK_ADDED, ALL_BOOKS } from './queries'

const Notify = ({ errorMessage }) => errorMessage ? <div>{errorMessage}</div> : null

const App = () => {
  const [page, setPage] = useState('')
  const [token, setToken] = useState(null)
  const [favGenre, setFavGenre] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    const token = localStorage.getItem('library-user-token')
    if ( token ) {
      setToken(token)
    }
  }, [])

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => 
      set.map(p => p.id).includes(object.id)  

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      })
    }   
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({subscriptionData}) => {
      const addedBook = subscriptionData.data.bookAdded
      window.alert(`A new book ${addedBook.title} was added.`)
      updateCacheWith(addedBook)
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
