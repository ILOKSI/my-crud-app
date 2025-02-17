import Book from "../models/book.js"
import User from "../models/user.js"

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    getBooks: async () => {
      const books = await Book.find({})
      return books
    },
    getUsers: async () => {
      const users = await User.find({})
      return users
    }
  },
  Mutation: {
    addBook: async (_, { content }) => {
       const res = await new Book( {
          title: content.title,
          author: content.author
        }).save()
      return res
    },
    addUser: async (_, { content }) => {
      const res = await new User( {
        firstName: content.firstName,
        lastName: content.lastName,
        email: content.email,
        password: content.password,
        role: content.role
       }).save()
     return res
   },
  deleteBook: async (_, { id }) => {
    const res = await Book.findByIdAndDelete({
      _id: id
    })
      
    return res
  },
  deleteUser: async (_, { id }) => {
    const res = await User.findByIdAndDelete({
      _id: id
    })
      
    return res
  },
  updateBook: async (_, { content }) => {
    const res = await Book.findOneAndUpdate({
      _id: content.id
      }, {
        $set: {
          title: content.title,
          author: content.author
        }
      }, {
        new: true
      }
    )
    return res
  },
  updateUser: async (_, { content }) => {
    const res = await User.findOneAndUpdate({
      _id: content.id
      }, {
        $set: {
          firstName: content.firstName,
          lastName: content.lastName,
          email: content.email,
          password: content.password,
          role: content.role
        }
      }, {
        new: true
      }
    )
    return res
  }
  }
}


export default resolvers
