import { gql } from '@apollo/client'

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      published
      genres
        author { 
          name
          born
          bookCount
        }
    }
  }
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

export const UPDATE_AUTHOR = gql`
  mutation updateAuthor($name: String!, $born: Int!) {
    editAuthor(
      name: $name,
      setBornTo: $born,
    ) {
      name
      born
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

export const CREATE_BOOK = gql`
  mutation createBook(
      $title: String!, 
      $published: Int!,
      $author: String!
      $genres: [String]) {
    addBook(
      title: $title,
      published: $published,
      author: $author
      genres: $genres
    ) {
      title
      published
      genres
    }
  }
`
