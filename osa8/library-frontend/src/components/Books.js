import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = ({ show }) => {
  const [genre, setGenre] = useState(null)
  const result = useQuery(ALL_BOOKS, {
    variables: { genre },
  });
  const fullResult = useQuery(ALL_BOOKS);
  const [books, setBooks] = useState([])
  const genreList = fullResult.data ? fullResult.data.allBooks.map(b => b.genres).flat().reduce((unique, g) => unique.includes(g) ? unique : [...unique, g], []) : []

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
    }
  }, [result.data])

  if (!show) {
    return null
  }

  const showGenre = (genre) => {
    setGenre(genre)
    if (genre === 'all') {
      setGenre(null)
    }
  }

  return (
    <div>
      <h2>books</h2>
      {genre ? <p>in genre <strong>{genre}</strong></p> : null}


      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {
        genreList.map((g, idx) => {
          return (
            <button key={idx} onClick={() => showGenre(g)}>{g}</button>
          )
        })
      }
      <button onClick={() => showGenre('all')}>all genres</button>
    </div>
  )
}

export default Books
