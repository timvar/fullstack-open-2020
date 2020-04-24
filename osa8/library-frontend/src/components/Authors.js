import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import {ALL_AUTHORS, UPDATE_AUTHOR} from '../queries'


const SetBirthYear = ({ submitBirthYear, authorName, birthYear, setBirthYear, setAuthorName }) => {
  return (
    <>
      <form onSubmit={submitBirthYear}>
        <div>
          name
          <input
            value={authorName}
            onChange={({ target }) => setAuthorName(target.value)}
          />
        </div>
        <div>
          born
          <input
            value={birthYear}
            onChange={({ target }) => setBirthYear(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </>
  )
}

const Authors = ({ show }) => {
  const result = useQuery(ALL_AUTHORS)
  const [authorName, setAuthorName] = useState('')
  const [birthYear, setBirthYear] = useState('')
  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{query: ALL_AUTHORS}]
  })

  if (!show) {
    return null
  }

  const authors = result.data ? result.data.allAuthors : []

  const handleBirthYear = (event) => {
    event.preventDefault()

    updateAuthor({
      variables: {
        name: authorName,
        born: Number(birthYear)
      }
    })

    setAuthorName('')
    setBirthYear('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <SetBirthYear
        submitBirthYear={handleBirthYear}
        authorName={authorName}
        birthYear={birthYear}
        setBirthYear={setBirthYear}
        setAuthorName={setAuthorName} />
    </div>
  )
}

export default Authors
