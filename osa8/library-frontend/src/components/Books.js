import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'


const Books = ({show}) => {
  const result = useQuery(ALL_BOOKS)
  if (result.data) {
    console.log('books', result.data.allBooks)

  }

  if (!show) {
    return null
  }

  const books = result.data ? result.data.allBooks : []

  return (
    <div>
      <h2>books</h2>

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
    </div>
  )
}

export default Books
