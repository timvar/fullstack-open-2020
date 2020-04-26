require('dotenv').config()
const { ApolloServer, UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

mongoose.set('useFindAndModify', false)

const JWT_SECRET = process.env.SECRET_KEY
const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => console.log('Error connecting to MongoDB:', error.message))

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String
    id: ID!
  }

  type Token {
    value: String!
  }

  input AuthorInput {
    name: String
  } 

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author
    id: ID!
    genres: [String!]!
  }

  type Query {
    bookCount: Int! 
    authorCount: Int!
    allBooks(author: AuthorInput, genre: String): [Book!]!
    allAuthors: [Author]
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String]
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(
      username: String!
      favoriteGenre: String
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.find({}).then(authors => authors.length),
    allBooks: (root, args) => {
      if (args.genre) {
        return Book.find({ genres: { $in: args.genre } })
      }
      return Book.find({}).populate('author')
    },
    allAuthors: () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Author: {
    bookCount: (root, args) => 0,
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const book = new Book({ ...args })
      const author = await Author.find({name: args.author})

      if (author.length === 0) {
        const newAuthor = new Author({
          name: args.author
        })
        try {
          await newAuthor.save()
          book.author = newAuthor
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        }
      } else if (author.length === 1) {
        book.author = author[0]
      }
      
      const currentUser = context.currentUser
      if (!currentUser) { throw new AuthenticationError('not authenticated')}

      try {
        return await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
    },
    editAuthor: async (root, args, {currentUser}) => {
      if (!currentUser) { throw new AuthenticationError('not authenticated')}
      const author = await Author.findOne({ name: args.name })
      author.born = args.setBornTo
      try {
        return await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
    },
    createUser: (root, args) => {
      const user = new User({ username: args.username })

      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'arska') {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({req}) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return {currentUser}
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
