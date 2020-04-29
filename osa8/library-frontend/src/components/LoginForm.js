import React, { useState, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { LOGIN, MYINFO } from '../queries'

const LoginForm = ({ setError, setToken, show, setPage, setFavGenre }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const myinfo = useQuery(MYINFO)

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if ( result.data ) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-user-token', token)
    }
  }, [result.data]) // eslint-disable-line

  const submit = async (event) => {
    event.preventDefault()
    login({ variables: { username, password } })
    myinfo.refetch()
    setUsername('')
    setPassword('')
    setPage('')
  }

  if (!show) {
    return null
  }

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div>
          username <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </>
  )
}

export default LoginForm
